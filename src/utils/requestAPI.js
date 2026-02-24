import axios from 'axios';
import useAuthStore from '../store/useAuthStore';

const client = axios.create({
  baseURL: 'https://api.ktdt.vnptnan.xyz/',
  headers: {
    'Content-Type': 'application/json'
  }
});

// 🛜 Interceptor cho request: luôn gắn token mới nhất
client.interceptors.request.use(config => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 📩 Interceptor cho response: xử lý lỗi toàn cục
client.interceptors.response.use(
  response => response,
  error => {
    const { response } = error;
    const originalRequest = error.config;

    if (response) {
      switch (response.status) {
        case 500:
        case 400:
          return Promise.reject(response.data);
        case 401:
          useAuthStore.getState().clearAll();
          window.location.href = '/login';
          return response;
        default:
          return originalRequest;
      }
    }
    return Promise.reject(error);
  }
);

/**
 * 📦 Hàm tiện ích: gọi API và cho phép truyền thêm options
 * @param {string} url - endpoint
 * @param {object} options - method, headers, params, data, v.v.
 */
export const request = (url, options = {}) => {
  return client({
    url,
    method: options.method || 'GET',
    ...options // cho phép override headers, params, data...
  });
};

export default client;
