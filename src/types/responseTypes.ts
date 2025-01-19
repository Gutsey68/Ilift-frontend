/**
 * Interface générique pour les réponses de l'API
 * @template T - Type des données retournées
 */
export interface ApiResponse<T> {
  message: string;
  data: T;
}

/**
 * Interface pour les réponses paginées de l'API
 * @template T - Type des données retournées
 */
export interface PaginatedResponse<T> extends ApiResponse<T> {
  data: T;
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
}
