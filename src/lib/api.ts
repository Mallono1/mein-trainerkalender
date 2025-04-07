import axios from 'axios';
import { host } from './config';

const api = axios.create({
  baseURL: host, // Use environment variable for API URL
  withCredentials: true, // Always send cookies
});

export const postData = async <T, R>(url: string, data: T): Promise<R> => {
  const response = await api.post<R>(url, data);
  return response.data;
};

export default api;
