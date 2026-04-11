import type { AxiosError } from "axios";
import { BACKEND_ERROR_CODES } from "@shared/constants/backend-error-code";
import type { IResponse } from "@shared/types/response";
import notify from "./notification";

export interface BusinessError extends Error {
  isBusinessError: true;
  code: number;
  serverData: IResponse<unknown>;
}

export function isBusinessError(error: unknown): error is BusinessError {
  return (
    error instanceof Error &&
    (error as BusinessError).isBusinessError === true
  );
}

export function isResponseBody(value: unknown): value is IResponse<unknown> {
  if (!value || typeof value !== "object") return false;

  return "success" in value && "code" in value;
}

export function isBusinessResponseFailed(
  value: unknown
): value is IResponse<unknown> {
  return isResponseBody(value) && value.success === false;
}

export function getBackendErrorMessage(data: Partial<IResponse<unknown>>) {
  return (
    data.message ||
    data.error ||
    "Thao tác không thành công. Vui lòng thử lại."
  );
}

export function createBusinessError(data: IResponse<unknown>): BusinessError {
  const businessError = new Error(getBackendErrorMessage(data)) as BusinessError;
  businessError.isBusinessError = true;
  businessError.code = data.code ?? BACKEND_ERROR_CODES.UNKNOWN;
  businessError.serverData = data;

  return businessError;
}

export function rejectBusinessError(
  data: IResponse<unknown>,
  shouldNotify = true
) {
  if (shouldNotify) {
    notify.error(getBackendErrorMessage(data));
  }

  return Promise.reject(createBusinessError(data));
}

export async function tryParseBlobErrorResponse(blob: Blob) {
  if (!blob.type.includes("application/json")) {
    return null;
  }

  try {
    const text = await blob.text();
    const json = JSON.parse(text) as unknown;
    return isResponseBody(json) ? json : null;
  } catch {
    return null;
  }
}

export function handleCommonHttpError(error: AxiosError<IResponse<unknown>>) {
  if (!error.response) {
    notify.error("Không thể kết nối đến máy chủ. Vui lòng kiểm tra mạng.");
    return Promise.reject(error);
  }

  const { status, data } = error.response;

  if (isBusinessResponseFailed(data)) {
    return rejectBusinessError(data);
  }

  if (status === 403) {
    notify.warning("Bạn không có quyền thực hiện hành động này.");
    return Promise.reject(error);
  }

  if (status === 404) {
    notify.warning("Không tìm thấy tài nguyên hoặc đường dẫn yêu cầu.");
    return Promise.reject(error);
  }

  if (status >= 500) {
    notify.error("Máy chủ gặp sự cố. Vui lòng thử lại sau ít phút.");
    return Promise.reject(error);
  }

  notify.error(getBackendErrorMessage(data ?? {}));
  return Promise.reject(error);
}
