import { Store } from 'vuex'
import { ToastState } from '~/store/toast'

export function doUrlSafeBase64(decoded: string) {
  return decoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function undoUrlSafeBase64(_encoded: string) {
  let encoded = _encoded.replace(/-/g, '+').replace(/_/g, '/')
  while (encoded.length % 4) encoded += '='
  return encoded
}

export function urlEncode(unencoded: string): string {
  const encoded = globalThis.btoa(unencoded)
  return doUrlSafeBase64(encoded)
}

export function urlDecode(_encoded: string): string {
  const encoded = undoUrlSafeBase64(_encoded)
  return globalThis.atob(encoded)
}

export function escapeHtml(unsafe: string) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export function putToClipboard(
  textToPut: string,
  toastContent: string,
  store: Store<ToastState>
) {
  navigator.clipboard.writeText(textToPut)
  store.commit('toast/show', {
    show: true,
    content: toastContent,
    iconHTML: `
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
    `,
    theme: 'success',
  })
}

export function getMonacoEditorDefaultOptions(theme: string) {
  return {
    language: 'javascript',
    theme,
    fontSize: parseFloat(getComputedStyle(document.documentElement).fontSize),
    scrollBeyondLastLine: false,
    scrollBeyondLastColumn: false,
    minimap: {
      enabled: false,
    },
    wordWrap: 'on',
    contextmenu: false,
  }
}
