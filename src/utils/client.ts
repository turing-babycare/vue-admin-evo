import Request, { RequestOptions } from './request';

const client = new Request({ baseURL: '/', $message: null, $modal: null });

export function initClient(options: RequestOptions) {
  client.init(options);
}

export default client;
