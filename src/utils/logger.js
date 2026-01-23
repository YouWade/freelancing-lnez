/**
 * 開發環境專用日誌系統
 * 只在開發環境下輸出 log，生產環境不輸出
 */

const isDev = import.meta.env.DEV;

export const logger = {
  log: (...args) => {
    if (isDev) {
      console.log(...args);
    }
  },

  warn: (...args) => {
    if (isDev) {
      console.warn(...args);
    }
  },

  error: (...args) => {
    // 錯誤在生產環境也要記錄
    console.error(...args);
  },

  info: (...args) => {
    if (isDev) {
      console.info(...args);
    }
  },

  debug: (...args) => {
    if (isDev) {
      console.debug(...args);
    }
  }
};
