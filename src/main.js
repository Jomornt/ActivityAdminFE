import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios'
import vueAxios from 'vue-axios'
import echarts from 'echarts'
import { post, fetch, patch, put, MyDelete } from './common/js/http'

Vue.prototype.$echarts = echarts
Vue.use(vueAxios, axios)
Vue.config.productionTip = false
Vue.prototype.$post = post
Vue.prototype.$fetch = fetch
Vue.prototype.$patch = patch
Vue.prototype.$put = put
Vue.prototype.$delete = MyDelete

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (sessionStorage.account) { // 获取当前的token是否存在
      next()
    } else {
      next({
        path: '/login', // 将跳转的路由path作为参数，登录成功后跳转到该路由
        query: { redirect: to.fullPath }
      })
    }
  } else { // 如果不需要权限校验，直接进入路由界面
    next()
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
