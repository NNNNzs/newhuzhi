import Vue from 'vue'
import Router from 'vue-router'
import guest from '@/components/guest.vue'
import about from '@/components/about.vue'
import main from '@/components/main.vue'
import index from '@/components/index.vue'
import newsItem from '@/components/newsItem.vue'
import login from '@/components/login.vue'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'index',
    component: index,
    redirect: '/news', // 重定向到新闻页面
    children: [{
      path: '/news',
      name: 'news',
      component: main,
      redirect: '/news/hot',// 重定向到热点新闻
      children: [{
        path: '/news/hot',
        name: 'hot',
        component: newsItem
      }, {
        path: '/news/technology',
        name: 'technology',
        component: newsItem
      }, {
        path: '/news/sport',
        name: 'sport',
        component: newsItem
      }, {
        path: '/news/search',
        name: 'search',
        component: newsItem
      }
      ]
    },
    {
      path: '/guestbook',
      name: 'guestbook',
      component: guest
    },
    {
      path: '/about',
      name: 'about',
      component: about
    }
    ]
  }, {
    path: '/login',
    name: 'login',
    component: login
  }
  ]
})
