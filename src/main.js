// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueRouter from 'vue-router'
import router from './router/index.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import global_ from './public/global'//引用文件
import echarts from 'echarts';
import VueSocketio from 'vue-socket.io';
import socketio from 'socket.io-client';
import './../static/css/common.css';
import $ from 'jquery';
//import 'lib-flexible/flexible.js'
Vue.prototype.$echarts = echarts
Vue.prototype.global = global_
Vue.use(ElementUI);
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(new VueSocketio({debug: true,connection: '',}))
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  
  components: { App },
  template: '<App/>'
})
