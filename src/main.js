import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 全局引入element-ui
Vue.use(ElementUI)

Vue.config.productionTip = false

// ------------axios处理------------
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'
Vue.prototype.$axios = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
