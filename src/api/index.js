import axios from 'axios';
import { BASE_URL, AUTH_URL } from '@/config';
import { isClient, isMobileDevice } from '@/util';
import { MessageBox } from 'element-ui';

let cookie = '';

const onRequest = (req) => {
  if (!isClient()) {
    req.headers.cookie = cookie;
  }
  return req;
};
const onRequestError = (err) => {
  return Promise.reject(err);
};

const onResponse = (res) => {
  return Promise.resolve(res);
};

const onResponseError = (err) => {
  if (isClient()) {
    if (!err.response) {
      // network error
      MessageBox({
        message: '请检查你的网络，点击确定刷新页面。',
        title: '未知错误',
        type: 'error',
      }).then(() => {
        window.location.reload();
      });
    } else if (err.response.status === 401) {
      // Authorization failed
      return window.location.href = `${AUTH_URL}?redirect_uri=${encodeURIComponent(window.location.href)}`;
    } else if (err.response.status >= 500) {
      MessageBox({
        message: '服务器错误',
        title: '服务器错误',
        type: 'error',
      });
    } else if (err.config.message !== false) {
      // error handler
      MessageBox({
        message: err.response.data.errmsg,
        title: `操作失败 (${err.response.data.errcode})`,
        type: 'error',
      });
    }
  }
  return Promise.reject(err);
};

export const http = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

export const setUserCookie = (cookies) => {
  cookie = cookies || '';
  return http;
};

http.interceptors.request.use(onRequest, onRequestError);
http.interceptors.response.use(onResponse, onResponseError);

export const http2 = axios.create({
  baseURL: 'https://easy-mock.com/mock/59ba312fe0dc663341a9c89c/test/', // 写死
  timeout: 10000,
  // withCredentials: true,
});

http2.interceptors.request.use(onRequest, onRequestError);
http2.interceptors.response.use(onResponse, onResponseError);
