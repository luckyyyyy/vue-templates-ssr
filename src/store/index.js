import Vue from 'vue';
import Vuex from 'vuex';
import { isDevelop } from '@/util';
// modules
import userModule from '@/store/modules/user';
// import home from '@/store/modules/home';
// import topic from '@/store/modules/topic';

// import eventModule from '@/store/modules/event';
// import teacher2017Module from '@/store/modules/event/teacher2017';
// import campustrip2017Module from '@/store/modules/event/campustrip2017';

Vue.use(Vuex);
let store;
export const a = 1;
export const createStore = () => {
  if (!store) {
    store = new Vuex.Store({
      strict: isDevelop(),
    });
    store.registerModule('user', userModule);
    // store.registerModule('home', home);
    // store.registerModule('topic', topic);
    // store.registerModule('event', eventModule);
    // store.registerModule(['event', 'teacher2017'], teacher2017Module);
    // store.registerModule(['event', 'campustrip2017'], campustrip2017Module);
  }
  return store;
};
