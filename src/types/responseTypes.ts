export interface ApiResponse<T> {
  message: string;
  data: T;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  data: T;
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
}
