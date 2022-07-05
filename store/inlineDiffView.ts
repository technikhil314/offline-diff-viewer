import { GetterTree, MutationTree } from 'vuex/types'

export const state = () => ({
  isEnabled: false,
})

export type isInlineDiffView = ReturnType<typeof state>

export const getters: GetterTree<isInlineDiffView, isInlineDiffView> = {
  isEnabled: (state) => state.isEnabled,
}

export const mutations: MutationTree<isInlineDiffView> = {
  toggle(state) {
    state.isEnabled = !state.isEnabled
  },
}
