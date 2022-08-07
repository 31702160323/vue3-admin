import { isNavigationFailure, Router } from 'vue-router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'
import { createStorage } from '@/utils/storage'
import { ACCESS_TOKEN } from '@/store/mutation-types'

const Storage = createStorage()

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const allowList = ['login'] // no redirect whitelist

export function createRouterGuards(router: Router) {
  router.beforeEach((to, _from, next) => {
    NProgress.start() // start progress bar
    const token = Storage.get(ACCESS_TOKEN)
    if (token) {
      next()
    } else {
      // not login
      if (allowList.includes(to.name as string)) {
        // 在免登录名单，直接进入
        next()
      } else {
        next({ path: '/login', replace: true })
        NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
      }
    }
  })

  router.afterEach((_to, _from, failure) => {
    if (isNavigationFailure(failure)) {
      console.log('failed navigation', failure)
    }
    NProgress.done()
  })

  router.onError((error) => {
    console.log(error, '路由错误')
  })
}
