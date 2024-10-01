import axios from 'axios';

const client = axios.create({
  baseURL: `https://api.ktdt.vnptnan.xyz/`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Methods': '*',
    'Content-Type': 'application/json'
  }
});

client.interceptors.request.use(config => {
  // do something before executing the request
  // For example tag along the bearer access token to request header or set a cookie
  const requestConfig = config;
  const { headers } = config;
  requestConfig.headers = { ...headers };
  requestConfig.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;

  return requestConfig;
});

client.interceptors.response.use(
  response => response,
  error => {
    /**
     * Do something in case the response returns an error code [3**, 4**, 5**] etc
     * For example, on token expiration retrieve a new access token, retry a failed request etc
     */
    const { response } = error;
    const originalRequest = error.config;
    if (response) {
      if (response.status === 500) {
        // do something here
        return Promise.reject(response.data);
      }
      if (response.status === 400) {
        // do something here
        return Promise.reject(response.data);
      }
      if (response.status === 401) {
        // do something here
        localStorage.clear();
        window.location.reload();
        return response;
      }
      return originalRequest;
    }
    return Promise.reject(error);
  }
);

export default client;
