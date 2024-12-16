import axios, {
} from 'axios';
import { appConfig } from './constants';

/**
 * Core axios instance
 * */
const axiosInstance = axios.create({
  baseURL: appConfig.baseUrl, // Only set the base URL
  params: {
    apikey: appConfig.apiKey, // Default parameter applied to all requests
  },
});

export default axiosInstance;
