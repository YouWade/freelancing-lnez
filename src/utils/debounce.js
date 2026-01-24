import { useEffect, useCallback, useRef } from 'react';

/**
 * Debounce 工具函數
 * @param {Function} func - 要延遲執行的函數
 * @param {number} delay - 延遲時間(毫秒)
 * @returns {Function} debounced 函數
 */
export const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
};

/**
 * useDebounce Hook
 * 用於在 React 組件中使用 debounce
 * @param {Function} callback - 要延遲執行的回調函數
 * @param {number} delay - 延遲時間(毫秒)
 * @returns {Function} debounced 回調函數
 */
export const useDebounce = (callback, delay) => {
    const timeoutRef = useRef(null);

    const debouncedCallback = useCallback(
        (...args) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                callback(...args);
            }, delay);
        },
        [callback, delay]
    );

    // 清理函數
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return debouncedCallback;
};
