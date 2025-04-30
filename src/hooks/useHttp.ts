import { useState, useCallback } from 'react';
import httpClient from '../utils/http';

// 通用请求Hook工厂函数
function createHttpHook<T, P = any>(
  method: 'get' | 'post' | 'put' | 'delete'
) {
  return (url: string, config: any = {}) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const execute = useCallback(
      async (payload?: P, overrideConfig = {}) => {
        try {
          setLoading(true);
          setError(null);

          const mergedConfig = { ...config, ...overrideConfig };

          let response;
          if (method === 'get' || method === 'delete') {
            response = await httpClient[method](url, mergedConfig);
          } else {
            response = await httpClient[method](url, payload, mergedConfig);
          }

          setData(response);
          return response;
        } catch (err) {
          setError(err as Error);
          throw err;
        } finally {
          setLoading(false);
        }
      },
      [url, config]
    );

    return { data, loading, error, execute };
  };
}

// 导出具体的HTTP请求hooks
export const useGet = createHttpHook<any>('get');
export const usePost = createHttpHook<any, any>('post');
export const usePut = createHttpHook<any, any>('put');
export const useDelete = createHttpHook<any>('delete');

// 为了方便使用，也导出一个通用的useHttp hook
export const useHttp = {
  get: useGet,
  post: usePost,
  put: usePut,
  delete: useDelete,
};

export default useHttp; 