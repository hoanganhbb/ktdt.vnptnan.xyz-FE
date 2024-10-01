import axios from 'axios';

const client = axios.create({
  baseURL: `http://113.160.171.15:8888`,
  headers: {
    'Content-Type': 'application/json'
  }
});
export default client