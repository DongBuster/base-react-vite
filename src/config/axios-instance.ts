import type { IResponse } from "@shared/types/response";
import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { handleRefreshToken } from "../shared/utils/refreshToken";
import tokenManager from "../shared/utils/tokenManager";
import notify from "./notification";

export interface IOriginRequest extends AxiosRequestConfig {
  _retry: boolean;
}

/**
 * BusinessError - Lỗi do BE trả về HTTP 200 nhưng success = false.
 * Phân biệt với lỗi HTTP thông thường (AxiosError).
 *
 * Sử dụng trong react-query:
 *   onError: (err) => {
 *     if (isBusinessError(err)) console.log(err.serverData.code);
 *   }
 */
export interface BusinessError extends Error {
  isBusinessError: true;
  /** code từ body BE: ví dụ 4001, 5002,... */
  code: number;
  /** Toàn bộ response body gốc */
  serverData: IResponse<unknown>;
}

export function isBusinessError(err: unknown): err is BusinessError {
  return (
    err instanceof Error &&
    (err as BusinessError).isBusinessError === true
  );
}

// ── Request interceptor ──────────────────────────────────────────────────────

const handleRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const access_token = tokenManager.getAccessToken();
  if (access_token && config.headers) {
    config.headers["Authorization"] = "Bearer " + access_token;
  }
  config.validateStatus = (status) => status >= 200 && status < 300;
  return config;
};

const handleRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

// ── Response interceptor ─────────────────────────────────────────────────────

const handleResponse = (response: AxiosResponse<IResponse<unknown>>) => {
  const { data } = response;

  // ── Bắt lỗi Business Logic: HTTP 200 nhưng success = false ──────────────
  //    BE trả { code, success: false, message } dù HTTP status vẫn là 200.
  //    Cần reject để react-query nhận onError / isError.
  if (data && data.success === false) {
    const message =
      data.message ||
      data.error ||
      "Thao tác không thành công. Vui lòng thử lại.";

    // Hiển thị thông báo lỗi tại đây, caller không cần xử lý thêm
    notify.error(message);

    const businessError = new Error(message) as BusinessError;
    businessError.isBusinessError = true;
    businessError.code = data.code;
    businessError.serverData = data;

    return Promise.reject(businessError);
  }

  // ── Trả data bình thường ─────────────────────────────────────────────────
  // GET → unwrap data.data (payload thực sự)
  if (response.config.method === "get") return data.data;

  // POST / PUT / DELETE → giữ nguyên body để caller đọc message, code,...
  return data;
};

const handleResponseError = async (error: AxiosError<IResponse<unknown>>) => {
  const originalRequest = error.config as IOriginRequest;

  // Không có phản hồi (timeout, mất mạng, CORS,...)
  if (!error.response) {
    notify.error("Không thể kết nối đến máy chủ. Vui lòng kiểm tra mạng.");
    return Promise.reject(error);
  }

  const { status } = error.response;

  // 401 – Token hết hạn → thử refresh
  if (status === 401 && !originalRequest?._retry) {
    return handleRefreshToken(originalRequest);
  }

  // 403 – Không có quyền
  if (status === 403) {
    notify.warning("Bạn không có quyền thực hiện hành động này.");
    return Promise.reject(error);
  }

  // 404 – Không tìm thấy
  if (status === 404) {
    notify.warning("Không tìm thấy tài nguyên hoặc đường dẫn yêu cầu.");
    return Promise.reject(error);
  }

  // 5xx – Lỗi hệ thống
  if (status >= 500) {
    notify.error("Máy chủ gặp sự cố. Vui lòng thử lại sau ít phút.");
    return Promise.reject(error);
  }

  // Các lỗi khác (400, 422,...)
  const message =
    error.response.data?.message ||
    error.message ||
    "Đã có lỗi xảy ra. Vui lòng thử lại.";

  notify.error(message);
  return Promise.reject(error.response);
};

// ── Tạo instance ─────────────────────────────────────────────────────────────

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(handleRequest as any, handleRequestError);
axiosClient.interceptors.response.use(handleResponse as any, handleResponseError as any);

export default axiosClient;
