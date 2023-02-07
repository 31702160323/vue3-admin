import { ref } from 'vue';
import { defineStore } from 'pinia';
import { createStorage } from '@/utils/storage';
import { ACCESS_TOKEN, CURRENT_USER } from '@/store/mutation-types';

export const useUserStore = defineStore('user', () => {
  const Storage = createStorage({ storage: localStorage });
  const Token = ref(Storage.get(ACCESS_TOKEN, ''));
  const userInfo = ref(Storage.get(CURRENT_USER, {}));

  function setToken(token) {
    Token.value = token;
  }

  function setInfo(info) {
    userInfo.value = info;
  }

  function Login(userInfo) {
    if (userInfo) {
      Storage.set(ACCESS_TOKEN, userInfo, 7 * 24 * 60 * 60 * 1000);
      Storage.set(CURRENT_USER, userInfo, 7 * 24 * 60 * 60 * 1000);
      setInfo(userInfo);
      setToken(userInfo);
    }
  }

  return {
    Token,
    userInfo,
    setToken,
    setInfo,
    Login
  };
});
