// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.common['Authentication-Token'] = store.state.token;
import VueAxios from 'vue-axios'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import store from './store/store.js'
import qs from 'qs'
Vue.prototype.$qs = qs;
Vue.use(VueAxios,axios);
Vue.use(XLSX,FileSaver);


Vue.use(ElementUI)

Vue.config.productionTip = false







// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  //判断是否存在token，如果存在将每个页面header都添加token
  if(store.state.token){
  config.headers.common['Authentication-Token']=store.state.token
  }
   
  return config;
  }, error => {
  // 对请求错误做些什么
  return Promise.reject(error);
  });
   
  // http response 拦截器
  axios.interceptors.response.use(
  response => {
   
  return response;
  },
  error => {
   
  if (error.response) {
  switch (error.response.status) {
  case 401:
  this.$store.commit('del_token');
  router.replace({
  path: '/login',
  query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
  })
  }
  }
  return Promise.reject(error.response.data)
  });






/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})



