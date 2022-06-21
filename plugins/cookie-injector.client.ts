import { Plugin } from '@nuxt/types'
import isDarkModeCookie from '~/helpers/isDarkModeCookie'
import isSkipTutorialCookie from '~/helpers/isSkipTutorialCookie'
import isSkipScrollInSyncTutorial from '~/helpers/isSkipScrollInSyncTutorial'
declare module 'vue/types/vue' {
  // this.$isDarkModeinside Vue components
  interface Vue {
    $isDarkMode: boolean
    $isSkipTutorial: boolean
    $isSkipScrollInSyncTutorial: boolean
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.$isDarkModeinside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $isDarkMode: boolean
    $isSkipTutorial: boolean
    $isSkipScrollInSyncTutorial: boolean
  }
  // nuxtContext.isDarkMode$
  interface Context {
    $isDarkMode: boolean
    $isSkipTutorial: boolean
    $isSkipScrollInSyncTutorial: boolean
  }
}

declare module 'vuex/types/index' {
  // this.$isDarkModeinside Vuex stores
  interface Store<S> {
    $isDarkMode: boolean | S
    $isSkipTutorial: boolean | S
    $isSkipScrollInSyncTutorial: boolean | S
  }
}

const cookieInjectorPlugin: Plugin = (_context, inject) => {
  inject('isDarkMode', isDarkModeCookie())
  inject('isSkipTutorial', isSkipTutorialCookie())
  inject('isSkipScrollInSyncTutorial', isSkipScrollInSyncTutorial())
}

export default cookieInjectorPlugin
