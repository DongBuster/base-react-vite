import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import type { IResponse } from "@shared/types/response";
import { handleRefreshToken } from "@shared/utils/refreshToken";
import tokenManager from "@shared/utils/tokenManager";
import {
  handleCommonHttpError,
  isBusinessResponseFailed,
  rejectBusinessError,
  tryParseBlobErrorResponse,
} from "./axios-error-helper";
import notify from "./notification";

export interface IOriginRequest extends AxiosRequestConfig {
  _retry: boolean;
}

const axiosFileClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosFileClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = tokenManager.getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosFileClient.interceptors.response.use(
  async (response: AxiosResponse) => {
    if (response.data instanceof Blob) {
      const blobJson = await tryParseBlobErrorResponse(response.data);

      if (blobJson && isBusinessResponseFailed(blobJson)) {
        return rejectBusinessError(blobJson);
      }
    }

    if (isBusinessResponseFailed(response.data)) {
      return rejectBusinessError(response.data as IResponse<unknown>);
    }

    return response;
  },
  async (error: AxiosError<IResponse<unknown> | Blob>) => {
    const originalRequest = error.config as IOriginRequest;

    if (!error.response) {
      return Promise.reject(error);
    }

    if (error.response.data instanceof Blob) {
      const blobJson = await tryParseBlobErrorResponse(error.response.data);

      if (blobJson && isBusinessResponseFailed(blobJson)) {
        return rejectBusinessError(blobJson);
      }
    }

    if (error.response.status === 401 && !originalRequest?._retry) {
      return handleRefreshToken(originalRequest);
    }

    if (error.response.status === 403) {
      notify.warning("Bạn không có quyền tải tài liệu này.");
      return Promise.reject(error);
    }

    if (error.response.status === 404) {
      notify.warning("File không tồn tại.");
      return Promise.reject(error);
    }

    return handleCommonHttpError(error as AxiosError<IResponse<unknown>>);
  }
);

export default axiosFileClient;
