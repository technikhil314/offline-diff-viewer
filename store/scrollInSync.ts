import { GetterTree, MutationTree } from 'vuex/types'

export const state = () => ({
  isEnabled: true,
})

export type isScrollInSync = ReturnType<typeof state>

export const getters: GetterTree<isScrollInSync, isScrollInSync> = {
  isEnabled: (state) => state.isEnabled,
}

export const mutations: MutationTree<isScrollInSync> = {
  toggle(state) {
    state.isEnabled = !state.isEnabled
  },
}
