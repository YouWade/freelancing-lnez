/**
 * API 錯誤處理工具
 * 統一處理和格式化錯誤訊息
 */

export const handleApiError = (error) => {
  // Axios 錯誤
  if (error.response) {
    // 伺服器回應錯誤
    const { status, data } = error.response;

    switch (status) {
      case 400:
        return {
          message: data.message || '請求參數錯誤',
          code: 'BAD_REQUEST',
          status,
        };
      case 401:
        return {
          message: data.message || '未授權，請重新登入',
          code: 'UNAUTHORIZED',
          status,
        };
      case 403:
        return {
          message: data.message || '沒有權限存取此資源',
          code: 'FORBIDDEN',
          status,
        };
      case 404:
        return {
          message: data.message || '找不到請求的資源',
          code: 'NOT_FOUND',
          status,
        };
      case 500:
        return {
          message: data.message || '伺服器錯誤，請稍後再試',
          code: 'SERVER_ERROR',
          status,
        };
      default:
        return {
          message: data.message || '發生未知錯誤',
          code: 'UNKNOWN_ERROR',
          status,
        };
    }
  } else if (error.request) {
    // 請求已發送但沒有收到回應
    return {
      message: '無法連接到伺服器，請檢查網路連線',
      code: 'NETWORK_ERROR',
      status: 0,
    };
  } else {
    // 其他錯誤
    return {
      message: error.message || '發生錯誤',
      code: 'CLIENT_ERROR',
      status: 0,
    };
  }
};

export const showErrorMessage = (error) => {
  const errorInfo = handleApiError(error);
  console.error('[API Error]', errorInfo);
  return errorInfo.message;
};
