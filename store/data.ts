import { GetterTree, MutationTree } from 'vuex/types'

export const state = () => ({
  lhs: '',
  rhs: '',
  lhsLabel: 'Original Text',
  rhsLabel: 'Changed Text',
})

export type DataState = ReturnType<typeof state>

export const getters: GetterTree<DataState, DataState> = {
  get: (state) => ({
    ...state,
  }),
}

export const mutations: MutationTree<DataState> = {
  set(state, { lhs, rhs, rhsLabel, lhsLabel }: DataState) {
    state.lhs = lhs
    state.rhs = rhs
    state.lhsLabel = lhsLabel
    state.rhsLabel = rhsLabel
  },
}
