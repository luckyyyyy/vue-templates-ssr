import createApp from '@/entry/main';
import { setUserCookie } from '@/api';
import { AUTH_URL, ROUTER_BASE, BASE_URL } from '@/config';
import axios from 'axios';

export default (context) => {
  return new Promise(async (resolve, reject) => {
    const { app, router, store } = createApp();
    const { cookie } = context;
    let { url } = context;
    if (url.indexOf(ROUTER_BASE) === 0) {
      url = url.substr(ROUTER_BASE.length);
    }
    const { fullPath } = router.resolve(url).route;
    if (fullPath !== url) {
      return reject({ url: fullPath });
    }
    setUserCookie(cookie);

    let user;
    try {
      user = await store.dispatch('user/GET_USER');
    } catch (err) {
      // 用户未登录 接口返回401 所以会进catch
    }

    const { route } = router.resolve(url);
    const requiresAuth = route.matched.some(record => record.meta.requiresAuth);
    if (!user && requiresAuth) {
      // return reject({ url: `/login?redirect_uri=${encodeURIComponent(context.url)}` });
      // return reject({ url: `${AUTH_URL}?redirect_uri=${encodeURIComponent(context.url)}` });
      return reject({ url: '/login' });
    }
    router.push(url);
    return router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      if (!matchedComponents.length) {
        return reject({ code: 404 });
      }
      setUserCookie(cookie); // 必须设置
      return Promise.all(matchedComponents.map(({ asyncData }) => asyncData && asyncData({
        store,
        route: router.currentRoute,
      }))).then(() => {
        context.state = store.state;
        resolve(app);
      }).catch((err) => {
        reject({ code: 500 });
      });
    });
  });
};
