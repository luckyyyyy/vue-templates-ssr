import Vue from 'vue';
import createApp from '@/entry/main';
import ProgressBar from '@/components/common/ProgressBar';
import wx from 'weixin-js-sdk';
import { AUTH_URL } from '@/config';
import { isDevelop, isInWechat, isios, isAndroid, isMobileDevice } from '@/util';

Vue.prototype.$wx = wx;
Vue.prototype.$bar = new Vue(ProgressBar).$mount();
const bar = Vue.prototype.$bar;
if (isMobileDevice()) {
  import('fastclick').then((FastClick) => {
    document.body.appendChild(bar.$el);
    FastClick.attach(document.body);
  });
}

// 横竖屏方案
// window.addEventListener('orientationchange', () => {
//   const orientation = window.orientation;
//   if (orientation === 90 || orientation === -90) {
//     alert('111');
//   }
// });

Vue.mixin({
  beforeRouteUpdate(to, from, next) {
    const { asyncData } = this.$options;
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to,
      }).then(next).catch(next);
    } else {
      next();
    }
  },
  // 客户端下先放行view方案
  // beforeMount () {
  //   const { asyncData } = this.$options;
  //   if (asyncData) {
  //     this.dataPromise = asyncData({
  //       store: this.$store,
  //       route: this.$route,
  //     });
  //   }
  // },
});

const { app, router, store } = createApp();

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}
router.onReady(() => {
  router.beforeEach((to, from, next) => { // 微信无解 刷新吧
    if (isInWechat() && isios()) {
      window.location.href = to.path;
    } else {
      next();
    }
  });
  router.beforeResolve((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    if (requiresAuth && Object.keys(store.state.user.user).length === 0) {
      window.location.href = AUTH_URL;
    }
    const matched = router.getMatchedComponents(to);
    const prevMatched = router.getMatchedComponents(from);
    let diffed = false;
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c));
    });
    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _);
    if (!asyncDataHooks.length) {
      return next();
    }
    bar.start();
    return Promise.all(asyncDataHooks.map(hook => hook({ store, route: to }))).then(() => {
      bar.finish();
      next();
    }).catch(next);
  });
  return app.$mount('#app');
});

if (window.location.protocol === 'https:' && navigator.serviceWorker) {
  navigator.serviceWorker.register('/service-worker.js');
}
