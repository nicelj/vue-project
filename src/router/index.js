import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index'
import Login from '@/page/Login'

Vue.use(Router)
// const Login = (resolve) => {require.ensure()}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    }
  ]
})
