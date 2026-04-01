export interface IPagination<T> {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  items: T[];
}

export interface IResponse<T> {
  code: number;
  success: boolean;
  data: T;
  error?: string;
  message: string;
}

export interface IResponsePagination<T> extends IResponse<IPagination<T>> {}
