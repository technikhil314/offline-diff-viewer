import { Plugin } from '@nuxt/types'
import isDarkModeCookie from '~/helpers/isDarkModeCookie'
declare module 'vue/types/vue' {
  // this.$isDarkModeinside Vue components
  interface Vue {
    $isDarkMode: boolean
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.$isDarkModeinside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $isDarkMode: boolean
  }
  // nuxtContext.isDarkMode$
  interface Context {
    $isDarkMode: boolean
  }
}

declare module 'vuex/types/index' {
  // this.$isDarkModeinside Vuex stores
  interface Store<S> {
    $isDarkMode: boolean
  }
}

const myPlugin: Plugin = (context, inject) => {
  inject('isDarkMode', isDarkModeCookie())
}

export default myPlugin
