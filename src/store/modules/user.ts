import { createStorage } from '@/utils/Storage'
const Storage = createStorage({ storage: localStorage })

export default {
  namespaced: true,
  state: {
    token: Storage.get('ACCESS_TOKEN', ''),
    info: Storage.get('CURRENT_USER', {})
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },
  actions: {
    Login({ commit }, userInfo) {
      if (userInfo) {
        commit('SET_TOKEN', 'result.token')
        // todo
        commit('SET_INFO', 'result')
      }
    }
  }
}
