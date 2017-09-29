import Vue from 'vue';
import Router from 'vue-router';
import topRoute from '@/router/top';
import homeRoute from '@/router/home';

import { ROUTER_BASE } from '@/config';

Vue.use(Router);

export const routes = [].concat(
  homeRoute,
  topRoute,
);

export const createRouter = () => {
  return new Router({
    mode: 'history',
    base: ROUTER_BASE,
    scrollBehavior: () => ({ y: 0 }),
    routes,
  });
};
