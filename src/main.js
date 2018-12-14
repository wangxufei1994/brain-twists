// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//图片压缩
import lrz from 'lrz'
//引入 mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
//挂载
Vue.use(MintUI)


// 引入公共样式表
import './assets/css/reset.css'
//引入iconfont
import'./assets/css/iconfont.css'

// 引入axios
import Axios from 'axios'
import Qs from 'qs'
Axios.defaults.headers["Content-type"]="application/x-www-form-urlencoded;charset=UTF-8"
//发送请求前处理 POST传参序列化
Axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = Qs.stringify(config.data);
    Vue.$indicator.open();
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
Axios.interceptors.response.use((res)=>{
  // 对响应数据做点什么
  Vue.$indicator.close();
  return res;
}, function (err) {
  // 对响应错误做点什么
  return Promise.reject(err);
});
Axios.defaults.baseURL="http://192.168.5.146:8080/apis/"
Vue.prototype.$axios=Axios
//挂载axios
Vue.use(Axios)
Vue.prototype.$qs=Qs


Vue.config.productionTip = false


//登录权限
router.beforeEach((to,from,next)=>{
  let userInfo=localStorage.getItem("userInfo");
  if(userInfo || to.name==="login" || to.name==="register"){
    next();
  }else{
    router.replace({
      name:"login"
    })
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
