import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Area from '@/components/Area'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Area',
      component: Area
    },
    {
      path: '/area/:name',
      name: 'Area',
      component: Area
    }
  ]
})