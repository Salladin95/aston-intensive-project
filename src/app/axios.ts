import axios, { InternalAxiosRequestConfig } from 'axios';
import { appConfig } from './constants';
import { User } from '~/shared/types';

/**
 * Core axios instance
 * */
const axiosInstance = axios.create({
  baseURL: appConfig.baseUrl,
  params: {
    apikey: appConfig.apiKey,
  },
});

function requestInterceptor(req: InternalAxiosRequestConfig) {
  const userString = localStorage.getItem('user')
  if (!userString) return req
  const user = JSON.parse(userString) as User
  const query = req.url;

  if (query) {
    const key = `${user.username}_history`;
    const existingHistory = JSON.parse(localStorage.getItem(key) || '[]');

    const newEntry = { query, date: new Date().toISOString() };

    const updatedHistory = [newEntry, ...existingHistory].slice(0, 50); // Ограничение на 50 записей
    localStorage.setItem(key, JSON.stringify(updatedHistory));
  }
  return req
}

axiosInstance.interceptors.request.use(requestInterceptor)

export default axiosInstance;
