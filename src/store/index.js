import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {// 存值
    count: 0,
    axiosDate: [],
    noticeNum: 3, // 提示数字
    Drawer: false, // 抽屉
    DrawerUrl: 'https://www.nnnnzs.cn' // 默认ifram的地址
  },
  mutations: {// 方法
    set (state, msg) {
      state.axiosDate = msg
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
    }
  }
})
