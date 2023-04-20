import CryptoJS from 'crypto-js'

export function hash(text: string) {
    return CryptoJS.SHA256(text).toString(CryptoJS.enc.Utf8)
}

export function encrypt(text: string, password: string) {
    return CryptoJS.AES.encrypt(text, password).toString();
}

export function decrypt(text: string, password: string) {
    return CryptoJS.AES.decrypt(text, password).toString(CryptoJS.enc.Utf8);
}