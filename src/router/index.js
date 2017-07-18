import Vue from 'vue'
import Router from 'vue-router'
import myMusic from '@/components/myMusic'
import more from '@/components/more'
import search from '@/components/search'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: myMusic
    },
    {
      path: '/myMusic',
      component: myMusic
    },
    {
      path: '/search',
      component: search
    },
    {
      path: '/more',
      component: more
    }
  ]
})
