import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index'
import Login from '@/page/Login'
import Topics from '@/page/topics.vue'
import TopicDetail from '@/page/topicdetail'
import NewTopic from '@/page/newtopic'
import Message from '@/page/message'
import Collect from '@/page/collect'
import Aboutme from '@/page/aboutme'

Vue.use(Router)
// const Login = (resolve) => {require.ensure()}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: (resolve) => require.ensure([], () => { resolve(require('@/page/Login')) }, 'login')
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
        },
        {
          path: '/newtopic',
          component: NewTopic
        },
        {
          path: '/message',
          component: Message
        },
        {
          path: '/collection',
          component: Collect
        },
        {
          path: '/aboutme',
          component: Aboutme
        }
      ]
    }
  ]
})
