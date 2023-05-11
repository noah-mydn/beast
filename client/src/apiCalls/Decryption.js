import CryptoJS from "crypto-js";

const iv = process.env.InVec;
const secretKey = process.env.ENCRYPTION_KEY;

export default function decryptMessage(encryptedMessage) {
  const decryptedMessage = CryptoJS.AES.decrypt(
    { ciphertext: CryptoJS.enc.Hex.parse(encryptedMessage) },
    CryptoJS.enc.Hex.parse(secretKey),
    { iv: CryptoJS.enc.Hex.parse(iv) }
  ).toString(CryptoJS.enc.Utf8);

  return decryptedMessage;
}
