import Vue from 'vue';
import Vuex from 'vuex';
import { isDevelop } from '@/util';
// modules
import userModule from '@/store/modules/user';

Vue.use(Vuex);

export const a = 1;
export const createStore = () => {
  return new Vuex.Store({
    strict: isDevelop(),
    modules: {
      user: userModule,
    },
  });
};
