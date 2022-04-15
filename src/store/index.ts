import { createStore } from 'vuex'

console.log('初始化 vuex')

const modules = {}
const files = require.context('./modules', false, /\.ts$/)
files.keys().forEach((key) => {
  modules[key.slice(2, -3)] = files(key).default
})

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  getters: {
    tabsList: (state) => state['tabs-view'].tabsList
  },
  modules: modules
})
