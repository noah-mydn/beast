//convert Base64 string to ArrayBuffer
const str2ab = (str) => {
    const buf = new Uint8Array(atob(str).split("").map(c => c.charCodeAt(0)));
    return buf.buffer;
};

//  Encrypt using the RECIPIENT'S Public Key
export const encryptWithPublicKey = async (text, publicKeyBase64) => {
    const publicKeyBuffer = str2ab(publicKeyBase64);
    const publicKey = await window.crypto.subtle.importKey(
        "spki",
        publicKeyBuffer,
        { name: "RSA-OAEP", hash: "SHA-256" },
        false,
        ["encrypt"]
    );

    const encodedText = new TextEncoder().encode(text);
    const encrypted = await window.crypto.subtle.encrypt(
        { name: "RSA-OAEP" },
        publicKey,
        encodedText
    );

    // Convert to Base64 to send over Socket/API
    return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
};

// Decrypt using user's Private Key
export const decryptWithPrivateKey = async (encryptedBase64, privateKeyBase64) => {
    const privateKeyBuffer = str2ab(privateKeyBase64);
    const privateKey = await window.crypto.subtle.importKey(
        "pkcs8",
        privateKeyBuffer,
        { name: "RSA-OAEP", hash: "SHA-256" },
        false,
        ["decrypt"]
    );

    const encryptedBuffer = str2ab(encryptedBase64);
    const decrypted = await window.crypto.subtle.decrypt(
        { name: "RSA-OAEP" },
        privateKey,
        encryptedBuffer
    );

    return new TextDecoder().decode(decrypted);
};