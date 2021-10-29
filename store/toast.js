export const state = () => ({
  show: false,
  content: "",
  theme: "info",
  iconHTML: "",
  autoDismis: true,
  timeout: 5000
})

export const mutations = {
  toggle(state) {
    state.show = state.content && !state.show;
  },
  setData(state, { theme = "info", content = "", iconHTML = "" }) {
    state.content = content;
    state.theme = theme;
    state.iconHTML = iconHTML
  },
  clean(state) {
    state.show = false;
    state.content = "";
    state.theme = "info";
    state.iconHTML = ""
  }
}
