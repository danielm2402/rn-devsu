import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import {BASE_URL} from '../../config/environment.js';

export interface Response<T = any> extends AxiosResponse<T>{}

const HttpProducts: AxiosInstance = axios.create({
	baseURL: BASE_URL,
	timeout: 60000,
});


export default HttpProducts;
