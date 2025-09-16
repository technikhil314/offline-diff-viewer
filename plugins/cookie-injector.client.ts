import { Plugin } from '@nuxt/types'
import isDarkModeCookie from '~/helpers/isDarkModeCookie'
import isSkipTutorialCookie from '~/helpers/isSkipTutorialCookie'
import isSkipScrollInSyncTutorial from '~/helpers/isSkipScrollInSyncTutorial'
import isSkipBackButtonPersistsDataTutorial from '~/helpers/isSkipBackButtonPersistsDataTutorial'
import isSkipSubmitKbdShortcutTutorial from '~/helpers/isSkipSubmitKbdShortcutTutorial'
import { Cookies } from '~/helpers/types'
import isSkipCopyLinkShortcutTutorial from '~/helpers/isSkipCopyLinkShortcutTutorial'
import isSkipCopyE2ELinkTutorial from '~/helpers/isSkipCopyE2ELinkTutorial'

declare module 'vue/types/vue' {
  interface Vue {
    $cookies: Cookies
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.$isDarkModeinside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $cookies: Cookies
  }
  // nuxtContext.isDarkMode$
  interface Context {
    $cookies: Cookies
  }
}

declare module 'vuex/types/index' {
  // this.$isDarkModeinside Vuex stores
  interface Store<S> {
    $cookies: Cookies | S
  }
}

const cookieInjectorPlugin: Plugin = (_context, inject) => {
  inject('cookies', {
    isDarkMode: isDarkModeCookie(),
    isSkipTutorial: isSkipTutorialCookie(),
    isSkipScrollInSyncTutorial: isSkipScrollInSyncTutorial(),
    isSkipBackButtonPersistsDataTutorial:
      isSkipBackButtonPersistsDataTutorial(),
    isSkipSubmitKbdShortcutTutorial: isSkipSubmitKbdShortcutTutorial(),
    isSkipCopyLinkShortcutTutorial: isSkipCopyLinkShortcutTutorial(),
    isSkipCopyE2ELinkTutorial: isSkipCopyE2ELinkTutorial(),
  })
}

export default cookieInjectorPlugin
