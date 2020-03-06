import 'babel-polyfill';

import Vue from 'vue';
import VueRouter from 'vue-router';
import config from '@/common/config';
import routes from '@/router/router';
//import store from '@/store';
import App from './App.vue';

import { ReqScreen } from '../api/fullscreen';


Vue.config.productionTip = false;

Vue.use(VueRouter);

import lrz from 'lrz';
import wx from 'weixin-js-sdk';


Vue.prototype.$ReqScreen = ReqScreen;

Vue.prototype.$wx = wx;
Vue.prototype.$lrz = lrz;

Vue.prototype.getViewportSize = function () {
  return {
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  };
};

export default {
  init(component) {
    routes.push({
      path: location.pathname,
      component
    });

    const router = new VueRouter({
      mode: config.vueRouterMode,
      routes
    });

    new Vue({
      router,
      //store,
      template: '<App/>',
      components: { App },
      created() {

        if (router.mode === 'hash' && !location.hash) {
          this.$router.push(location.pathname)
        }
      }
    }).$mount('#app');
  }
}
