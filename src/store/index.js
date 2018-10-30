import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {// 存值
    host:'http://192.168.15.72:3001',
    // host:'http://localhost:3001',
    axiosDate: {
      hot: [],
      technology: [],
      sport: [],
      search: []
    },
    user: {
      account: '',
      nickname: ''
    },
    noticeNum: 3, // 提示数字
    Drawer: false, // 抽屉
    DrawerUrl: 'https://www.nnnnzs.cn' // 默认ifram的地址
  },
  mutations: {// 方法
    set (state, msg) {
      let key = msg.type
      let data = msg.data
      for (let index in data) {
        state.axiosDate[key].push(data[index])
      }
    },
    clearNews (state, type) {
      state.axiosDate[type] = []
    },
    addNotice (state) {
      state.noticeNum += 1
    },
    clearNotice (state) {
      state.noticeNum = 0
    },
    toggleDrawer (state) {
      state.Drawer = !state.Drawer
    },
    setDrawerUrl (state, newUrl) {
      state.DrawerUrl = newUrl
    },
    login (state, loginInfo) {
      state.user = loginInfo
    },
    exit (state) {
      state.user.account = ''
      state.user.nickname = ''
    }
  }
})
