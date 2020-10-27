import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getToken } from './auth';
import { message, Modal } from 'ant-design-vue';

interface Options {
  baseURL: string;
  $message: typeof message;
  $modal: typeof Modal;
}

export default class Request {
  public axios: AxiosInstance;

  constructor(public options: Options) {
    this.axios = Axios.create({
      baseURL: options.baseURL
    });
    this.axios.interceptors.request.use(config => {
      const token = getToken();
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    });
    this.axios.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        if (error.response) {
          const response = error.response as AxiosResponse;
          const traceId = response.headers['X-TRACE-ID'];
          const msg = response.data['message'];
          error.message = msg;
          if (response.status === 401) {
            this.options.$modal.warning({
              title: '登录超时',
              content: `登录超时，请重新登录`,
              onOk: () => {
                this.options.$message.loading('跳转登录中...');
              }
            });
          } else if (response.status === 500) {
            this.options.$modal.error({
              title: '操作失败',
              content: `${msg} [${traceId}]`
            });
          } else {
            this.options.$modal.warning({
              title: '操作失败',
              content: `${msg} [${traceId}]`
            });
          }
        } else {
          this.options.$modal.error({
            title: '操作失败',
            content: `服务器连接失败: ${error.message}`
          });
          error.message = `服务器连接失败: ${error.message}`;
        }
        return Promise.reject(error);
      }
    );
  }

  async fetch(config: AxiosRequestConfig = {}) {
    return this.axios(config);
  }

  async get(url: string, config: AxiosRequestConfig) {
    return this.fetch({ url, method: 'GET', ...config });
  }

  async post(url: string, config: AxiosRequestConfig) {
    return this.fetch({ url, method: 'POST', ...config });
  }

  async put(url: string, config: AxiosRequestConfig) {
    return this.fetch({ url, method: 'PUT', ...config });
  }

  async delete(url: string, config: AxiosRequestConfig) {
    return this.fetch({ url, method: 'DELETE', ...config });
  }
}
