import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import App from '@/App';
import { createStore } from '@/store';
import { createRouter } from '@/router';
import titleMixin from '@/util/title';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/reset.css';
import 'element-ui/lib/theme-default/index.css';
import '@/scss/main.scss';

Vue.mixin(titleMixin);
Vue.use(ElementUI);

export default function createApp() {
  const store = createStore();
  const router = createRouter();

  sync(store, router);

  const app = new Vue({
    router,
    store,
    render: h => h(App),
  });

  return { app, router, store };
}
