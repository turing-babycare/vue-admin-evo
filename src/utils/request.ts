import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getToken, removeToken } from './auth';
// import { message, Modal } from 'ant-design-vue';

export interface RequestOptions {
  baseURL: string;
  $message: any;
  $modal: any;
}
export interface RequestConfig extends AxiosRequestConfig {
  mock?: string;
}
export default class Request {
  public axios: AxiosInstance;

  constructor(options: RequestOptions) {
    this.axios = this.init(options);
  }
  private getModal(modal: any, title: any, msg: any) {
    if (modal.alert) {
      return modal.alert(msg, title);
    }
    if (modal?.warning) {
      return modal?.warning({ title, content: msg });
    }
    if (modal?.error) {
      return modal?.error({ title, content: msg });
    }
  }
  public init(options: RequestOptions) {
    const title = '操作失败';
    const axios = Axios.create({
      baseURL: options.baseURL
    });
    this.axios = axios;
    axios.interceptors.request.use((config: RequestConfig) => {
      const token = getToken();
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      if (config.params?.mock || config.data?.mock) {
        const mockUrl = config.params?.mock
          ? config.params.mock
          : config.data.mock;
        config.url = mockUrl + config.url;
      }
      return config;
    });
    axios.interceptors.response.use(
      response => {
        const msg = response.data.msg;
        if (response.data.code === 500) {
          this.getModal(options.$modal, title, msg);
        }
        return response.data;
      },
      error => {
        if (error.response) {
          const response = error.response as AxiosResponse;
          const traceId = response.headers['X-TRACE-ID'];
          const id = traceId ? `[${traceId}] ` : '';
          const msg = response.data['message'];
          error.message = msg;
          if (response.status === 401) {
            options.$message.warning('登录超时，请重新登录!');
            setTimeout(() => {
              removeToken();
              location.reload();
            }, 1000);
          } else if (response.status === 500 || response.data.code === 500) {
            this.getModal(options.$modal, title, `${msg} ${id}`);
          } else {
            this.getModal(options.$modal, title, `${msg} ${id}`);
          }
        } else {
          this.getModal(
            options.$modal,
            '操作失败',
            `服务器连接失败: ${error.message}`
          );
          error.message = `服务器连接失败: ${error.message}`;
        }
        return Promise.reject(error);
      }
    );
    return axios;
  }

  async fetch(config: RequestConfig = {}) {
    return this.axios(config);
  }

  async get(url: string, config: RequestConfig) {
    return this.fetch({ url, method: 'GET', ...config });
  }

  async post(url: string, config: RequestConfig) {
    return this.fetch({ url, method: 'POST', ...config });
  }

  async put(url: string, config: RequestConfig) {
    return this.fetch({ url, method: 'PUT', ...config });
  }

  async delete(url: string, config: RequestConfig) {
    return this.fetch({ url, method: 'DELETE', ...config });
  }
}
