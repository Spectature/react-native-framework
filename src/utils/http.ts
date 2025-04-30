import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { userStore } from '../store/user';

// API基础URL，可以根据环境变量设置不同的值
const BASE_URL = process.env.API_URL;
console.log(BASE_URL);

// 请求超时时间
const TIMEOUT = process.env.API_TIMEOUT;

// 创建Axios实例
const httpClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// 请求拦截器
httpClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 使用UserStore获取token
    const bearerToken = userStore.bearerToken;
    if (bearerToken) {
      config.headers = {
        ...config.headers,
        Authorization: bearerToken,
      };
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
httpClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // 直接返回响应数据
    return response.data;
  },
  (error: AxiosError) => {
    if (error.response) {
      // 服务器返回了错误状态码
      const { status } = error.response;
      switch (status) {
        case 400:
          console.error('错误请求');
          break;
        case 401:
          console.error('未授权，请重新登录');
          // 清除用户信息
          userStore.logout();
          break;
        case 403:
          console.error('拒绝访问');
          break;
        case 404:
          console.error('请求错误，未找到该资源');
          break;
        case 405:
          console.error('请求方法未允许');
          break;
        case 408:
          console.error('请求超时');
          break;
        case 500:
          console.error('服务器端出错');
          break;
        case 501:
          console.error('网络未实现');
          break;
        case 502:
          console.error('网络错误');
          break;
        case 503:
          console.error('服务不可用');
          break;
        case 504:
          console.error('网络超时');
          break;
        case 505:
          console.error('HTTP版本不支持该请求');
          break;
        default:
          console.error(`连接错误${status}`);
      }
    } else if (error.request) {
      // 请求已经发出，但没有收到响应
      console.error('网络错误，请检查您的网络连接');
    } else {
      // 请求被取消或者发送请求时异常
      console.error('请求错误', error.message);
    }

    // 返回完整的错误信息以便更好地调试
    return Promise.reject(error);
  }
);

export default httpClient; 