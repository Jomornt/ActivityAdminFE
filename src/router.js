import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home/Home'
import User from '@/pages/User/User'
import Activity from '@/pages/Activity/Activity'
import Record from '@/pages/Activity/Record'
import Notify from '@/pages/Message/Notify'
import Feedback from '@/pages/Message/Feedback'
import Login from '@/pages/Login/Login'
import Content from '@/pages/Content'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Content,
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: '/home',
          name: 'Home',
          component: Home,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/user',
          name: 'User',
          component: User,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/activity',
          name: 'Activity',
          component: Activity,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/record',
          name: 'Record',
          component: Record,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/notify',
          name: 'Notify',
          component: Notify,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/feedback',
          name: 'Feedback',
          component: Feedback,
          meta: {
            requireAuth: true
          }
        }
      ]
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
