import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

import { handleRefreshToken } from "@shared/utils/refreshToken";
import tokenManager from "@shared/utils/tokenManager";
import notify from "./notification";
export interface IOriginRequest extends AxiosRequestConfig {
  _retry: boolean;
}
// Tạo instance riêng biệt
const axiosFileClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 1. Request Interceptor: Gắn Token
axiosFileClient.interceptors.request.use(
  // FIX: Sử dụng InternalAxiosRequestConfig thay vì AxiosRequestConfig
  (config: InternalAxiosRequestConfig) => {
    const access_token = tokenManager.getAccessToken();
    // Với InternalAxiosRequestConfig, headers luôn tồn tại, không cần check undefined quá kỹ
    if (access_token) {
      config.headers.Authorization = "Bearer " + access_token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 2. Response Interceptor: Xử lý phản hồi chuyên cho File
axiosFileClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Với client này, ta LUÔN LUÔN trả về nguyên response
    // để Service có thể lấy headers['content-disposition']
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    // Xử lý lỗi mất mạng / không kết nối được
    if (!error.response) {
      notify.error("Không thể kết nối đến máy chủ. Vui lòng kiểm tra mạng.");
      return Promise.reject(error);
    }

    const status = error.response.status;

    // --- XỬ LÝ LỖI ĐẶC BIỆT KHI DOWNLOAD (BLOB) ---
    if (
      error.response.data instanceof Blob &&
      error.response.data.type === "application/json"
    ) {
      try {
        const text = await error.response.data.text();
        const errorJson = JSON.parse(text);
        const message = errorJson.message || "Lỗi khi tải file từ server.";
        notify.error(message);
        return Promise.reject(errorJson);
      } catch (e) {
        // Fallback nếu không parse được
      }
    }

    // Xử lý Token hết hạn (401)
    if (status === 401 && !originalRequest._retry) {
      // FIX: Chỉ truyền 1 tham số nếu hàm handleRefreshToken của bạn chưa hỗ trợ tham số thứ 2
      return handleRefreshToken(originalRequest);
    }

    // Các lỗi thông thường
    if (status === 403) notify.warning("Bạn không có quyền tải tài liệu này.");
    else if (status === 404) notify.warning("File không tồn tại.");
    else notify.error("Có lỗi xảy ra khi tải file.");

    return Promise.reject(error);
  }
);

export default axiosFileClient;
