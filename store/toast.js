export const state = () => ({
  show: false,
  content: "",
  theme: "info",
  iconHTML: "",
  autoDismis: true,
  timeout: 5000
})
let timeoutId = null;
export const mutations = {
  show(state, {
    show,
    content,
    iconHTML,
    theme
  }) {
    if (!show) {
      state.show = show;
      return;
    }
    const isAlreadyShowing = state.show;
    state.content = content;
    state.theme = theme || "info";
    state.iconHTML = iconHTML
    state.show = content && show;
    if (isAlreadyShowing && state.show && timeoutId) {
      clearTimeout(timeoutId);
    }
    if (state.show) {
      timeoutId = setTimeout(() => {
        this.commit('toast/show', { show: false })
      }, 5000)
    }
  },
}
