/**
 * API 回應格式化工具
 * 統一處理 API 回應格式
 */

export const formatResponse = (response) => {
  return {
    success: true,
    data: response.data,
    message: response.message || 'Success',
    timestamp: new Date().toISOString(),
  };
};

export const formatError = (error) => {
  return {
    success: false,
    error: {
      message: error.message || 'An error occurred',
      code: error.code || 'UNKNOWN_ERROR',
      status: error.status || 0,
    },
    timestamp: new Date().toISOString(),
  };
};

export const formatPaginatedResponse = (response) => {
  return {
    success: true,
    data: response.data,
    pagination: {
      page: response.page || 1,
      limit: response.limit || 10,
      total: response.total || 0,
      totalPages: response.totalPages || 0,
      hasMore: response.hasMore || false,
    },
    message: response.message || 'Success',
    timestamp: new Date().toISOString(),
  };
};
