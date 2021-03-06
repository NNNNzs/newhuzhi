// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import axios from 'axios'
import Vuex from 'vuex'
import store from './store/index'
import './assets/style/main.css'
axios.defaults.withCredentials = true;
axios.interceptors.response.use(function (response) {
  // token 已过期，重定向到登录页面
  if (response.data == '请登录') {
    alert('登录超时')
  }
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
});
Vue.prototype.axios = axios
Vue.config.productionTip = false
Vue.use(iView)
Vue.use(Vuex)
/* eslint-disable no-new */

//全局时间过滤器
Vue.filter('timeFormat', function (time) {
  let t = new Date(time);
  let m = t.getMinutes();
  m = m >= 10 ? m : '0' + m;
  return `${t.getFullYear()}年${t.getMonth()+1}月${t.getDate()}日${t.getHours()}:${m}`
})
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>',
  store,
})
