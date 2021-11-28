import { GetterTree, Store, MutationTree } from 'vuex'

export const state = () => ({
  show: false,
  content: '',
  theme: 'info',
  iconHTML: '',
  autoDismiss: true,
  timeout: 5000,
})
let timeoutId: NodeJS.Timeout

export type ToastState = ReturnType<typeof state>

export const getters: GetterTree<ToastState, ToastState> = {
  show: (state) => state.show,
  content: (state) => state.content,
  theme: (state) => state.theme,
  iconHTML: (state) => state.iconHTML,
  autoDismiss: (state) => state.autoDismiss,
  timeout: (state) => state.timeout,
}

export const mutations: MutationTree<ToastState> = {
  show(state, { show, content, iconHTML, theme }: ToastState) {
    if (!show) {
      state.show = show
      return
    }
    const isAlreadyShowing = state.show
    state.content = content
    state.theme = theme || 'info'
    state.iconHTML = iconHTML
    state.show = !!content && show
    if (isAlreadyShowing && state.show && timeoutId) {
      clearTimeout(timeoutId)
    }
    if (state.show) {
      timeoutId = setTimeout(() => {
        const store = this as unknown as Store<ToastState>
        store.commit('toast/show', { show: false })
      }, 5000)
    }
  },
}
