import { GetterTree, MutationTree } from 'vuex/types'

export const state = () => ({
  darkMode: false
})

export type themeStore = ReturnType<typeof state>

export const getters: GetterTree<themeStore, themeStore> = {
  isEnabled: (state) => state.darkMode,
}

export const mutations: MutationTree<themeStore> = {
  toggle(state) {
    state.darkMode = !state.darkMode
  },
  set(state, value) {
    state.darkMode = value
  }
}
