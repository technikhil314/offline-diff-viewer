export function urlEncode(unencoded: string): string {
  var encoded = globalThis.btoa(unencoded)
  return encoded.replace('+', '-').replace('/', '_').replace(/=+$/, '')
}

export function urlDecode(encoded: string): string {
  encoded = encoded.replace('-', '+').replace('_', '/')
  while (encoded.length % 4) encoded += '='
  return globalThis.atob(encoded)
}
