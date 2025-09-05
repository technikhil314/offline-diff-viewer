import { arrayBufferToBase64 } from "./utils";

export async function getEncryptionKey(): Promise<CryptoKey> {
  const symmetricEncryptionKey = await window.crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 128 },
    true, // extractable
    ['encrypt', 'decrypt']
  );
  return symmetricEncryptionKey;
}

export async function getEncryptedData(content: string, key: CryptoKey): Promise<string> {
  const encryptedContentBuffer = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: new Uint8Array(12) /* don't reuse key! */ },
    key,
    new TextEncoder().encode(content)
  );
  const ecryptedText = arrayBufferToBase64(encryptedContentBuffer);
  return ecryptedText;
}

export async function getExtractedEncryptionKey(key: CryptoKey): Promise<string> {
  const extractedEncryptionJWK = (await window.crypto.subtle.exportKey('jwk', key));
  return extractedEncryptionJWK.k as string;
}
