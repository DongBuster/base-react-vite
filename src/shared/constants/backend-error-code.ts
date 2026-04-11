export const BACKEND_ERROR_CODES = {
  UNKNOWN: 0,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  VALIDATION_ERROR: 422,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export type BackendErrorCode =
  (typeof BACKEND_ERROR_CODES)[keyof typeof BACKEND_ERROR_CODES];

// key:value map from BE code to default message
export const BACKEND_ERROR_MESSAGES: Record<number, string> = {
  [BACKEND_ERROR_CODES.UNKNOWN]: "Unknown error",
  [BACKEND_ERROR_CODES.UNAUTHORIZED]: "Unauthorized",
  [BACKEND_ERROR_CODES.FORBIDDEN]: "Forbidden",
  [BACKEND_ERROR_CODES.NOT_FOUND]: "Not found",
  [BACKEND_ERROR_CODES.VALIDATION_ERROR]: "Validation error",
  [BACKEND_ERROR_CODES.INTERNAL_SERVER_ERROR]: "Internal server error",
};
