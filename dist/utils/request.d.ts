import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
export interface RequestOptions {
    baseURL: string;
    $message: any;
    $modal: any;
}
export default class Request {
    axios: AxiosInstance;
    constructor(options: RequestOptions);
    init(options: RequestOptions): AxiosInstance;
    fetch(config?: AxiosRequestConfig): Promise<AxiosResponse<any>>;
    get(url: string, config: AxiosRequestConfig): Promise<AxiosResponse<any>>;
    post(url: string, config: AxiosRequestConfig): Promise<AxiosResponse<any>>;
    put(url: string, config: AxiosRequestConfig): Promise<AxiosResponse<any>>;
    delete(url: string, config: AxiosRequestConfig): Promise<AxiosResponse<any>>;
}
