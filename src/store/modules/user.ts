import { createStorage } from '@/utils/storage';
import { ACCESS_TOKEN, CURRENT_USER } from '@/store/mutation-types';

const Storage = createStorage({ storage: localStorage });

export default {
  namespaced: true,
  state: {
    token: Storage.get(ACCESS_TOKEN, ''),
    info: Storage.get(CURRENT_USER, {})
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_INFO: (state, info) => {
      state.info = info;
    }
  },
  actions: {
    Login({ commit }, userInfo) {
      if (userInfo) {
        Storage.set(ACCESS_TOKEN, userInfo, 7 * 24 * 60 * 60 * 1000);
        Storage.set(CURRENT_USER, userInfo, 7 * 24 * 60 * 60 * 1000);
        commit('SET_TOKEN', userInfo);
        // todo
        commit('SET_INFO', userInfo);
      }
    }
  }
};
