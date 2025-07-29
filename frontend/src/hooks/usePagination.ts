/**
 * Custom hook for pagination
 */
import { useState, useEffect } from 'react';
import { PAGINATION } from '../constants/app.constants';

/**
 * Pagination state interface
 */
interface PaginationState {
  page: number;
  limit: number;
  total: number;
}

/**
 * Pagination change handler parameters
 */
interface PaginationChangeParams {
  page?: number;
  limit?: number;
}

/**
 * Hook for managing pagination state
 * @param initialPage Initial page number (default: 1)
 * @param initialLimit Initial page size (default: 10)
 * @param initialTotal Initial total items count (default: 0)
 * @returns Pagination state and handlers
 */
export const usePagination = (
  initialPage = PAGINATION.DEFAULT_PAGE,
  initialLimit = PAGINATION.DEFAULT_LIMIT,
  initialTotal = 0
) => {
  const [pagination, setPagination] = useState<PaginationState>({
    page: initialPage,
    limit: initialLimit,
    total: initialTotal,
  });

  /**
   * Calculate total pages based on limit and total items
   */
  const totalPages = Math.ceil(pagination.total / pagination.limit) || 1;

  /**
   * Update pagination parameters
   */
  const handlePaginationChange = ({
    page = pagination.page,
    limit = pagination.limit,
  }: PaginationChangeParams) => {
    setPagination((prev) => ({
      ...prev,
      page: page > totalPages ? 1 : page,
      limit,
    }));
  };

  /**
   * Set total items count
   */
  const setTotal = (total: number) => {
    setPagination((prev) => ({
      ...prev,
      total,
      // Adjust page if current page is now invalid
      page: prev.page > Math.ceil(total / prev.limit) && total > 0
        ? Math.ceil(total / prev.limit)
        : prev.page,
    }));
  };

  /**
   * Reset pagination to first page
   */
  const resetPagination = () => {
    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));
  };

  // Calculate offset for API requests
  const offset = (pagination.page - 1) * pagination.limit;

  return {
    page: pagination.page,
    limit: pagination.limit,
    total: pagination.total,
    offset,
    totalPages,
    handlePaginationChange,
    setTotal,
    resetPagination,
  };
};
