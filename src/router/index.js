import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index'
import Login from '@/page/Login'
import Topics from '@/page/topics.vue'
import TopicDetail from '@/page/topicdetail'

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
      component: Index,
      // 这里只是来进行组件的嵌套，path不会自动合并
      children: [
        {
          path: '/topics',
          component: Topics
        },
        {
          path: '/topicdetail',
          component: TopicDetail
        }
      ]
    }
  ]
})
