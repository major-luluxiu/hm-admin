import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login.vue'
import Home from '../pages/Home.vue'
import Post from '../pages/Post.vue'
import Publish from '../pages/Publish.vue'

Vue.use(VueRouter)

// 路由器
const router = new VueRouter({
  routes: [
    { path: '/login', name: 'login', component: Login },
    {
      path: '/',
      component: Home,
      children: [
        { path: '/', name: 'post', component: Post },
        { path: '/publish', name: 'publish', component: Publish }
      ]
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.path === '/' && !token) {
    next('/login')
  }
  next()
})

export default router
