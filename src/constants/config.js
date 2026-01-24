/**
 * 應用程式配置
 * 集中管理環境變數和配置項
 */

export const CONFIG = {
    // API 配置
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
    API_TIMEOUT: import.meta.env.VITE_API_TIMEOUT || 10000,

    // Mock 模式配置
    ENABLE_MOCK: import.meta.env.VITE_ENABLE_MOCK === 'true',

    // localStorage 配置
    DEBOUNCE_DELAY: 500, // localStorage 寫入延遲(毫秒)
};
