import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index.vue'
import guest from '@/components/guest.vue'
import about from '@/components/about.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: index
    },
    {
      path: '/guestbook',
      name: '留言板',
      component: guest
    },
    {
      path: '/about',
      name: '关于',
      component: about
    }
  ]
})
