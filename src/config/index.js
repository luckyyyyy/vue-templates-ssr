import { isDevelop, isClient } from '@/util';

export const GLOBAL_TITLE = '差评';
export const BASE_URL = (() => {
  if (isDevelop()) {
    if (isClient()) {
      return `${window.location.origin}/api`; // 内网IP的情况
    }
    return 'http://localhost:9999/api'; // 服务端直接本地node代理
  }
  return 'https://event.chaping.tv/api';
})();
export const AUTH_URL = isDevelop() ? '/api/user/debug' : 'https://event.chaping.tv/api/oauth2/wechat';
export const ROUTER_BASE = '';
