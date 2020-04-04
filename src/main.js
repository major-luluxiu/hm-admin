import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import VueQuillEditor from 'vue-quill-editor'

// 完整导入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// --------------quill-editor富文本--------

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

Vue.use(VueQuillEditor /* { default global options } */)

// 基础样式
import './styles/base.css'

// ---------------过滤器------------------
import moment from 'moment'
Vue.filter('date', function(input) {
  return moment(input).format('YYYY-MM-DD')
})

// 全局引入element-ui
Vue.use(ElementUI)

Vue.config.productionTip = false

// ------------axios处理------------
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'
Vue.prototype.$axios = axios
// 请求拦截
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
