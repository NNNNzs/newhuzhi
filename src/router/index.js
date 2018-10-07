import Vue from 'vue'
import Router from 'vue-router'
import guest from '@/components/guest.vue'
import about from '@/components/about.vue'
import main from '@/components/main.vue'
import index from '@/components/index.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: '首页',
      component: index,
      redirect: '/news',//重定向到新闻页面
      children: [
        {
          path: '/news',
          name: '新闻',
          component: main,
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
    },

  ]
})
