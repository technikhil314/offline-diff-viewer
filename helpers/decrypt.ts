import { base64ToArrayBuffer } from './utils'

export async function getDepryctionKey(key: string) {
  const decryptionKey = await window.crypto.subtle.importKey(
    'jwk',
    {
      k: key,
      alg: 'A128GCM',
      ext: true,
      key_ops: ['encrypt', 'decrypt'],
      kty: 'oct',
    },
    { name: 'AES-GCM', length: 128 },
    false, // extractable
    ['decrypt']
  )
  return decryptionKey
}

export async function getDecryptedText(data: string, key: CryptoKey) {
  const decryptedContentBuffer = await window.crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: new Uint8Array(12) },
    key,
    base64ToArrayBuffer(data)
  )
  const plainText = new window.TextDecoder().decode(new Uint8Array(decryptedContentBuffer))
  return plainText
}
