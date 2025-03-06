import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  encryptData(data: string, key: string): string {
    const iv = CryptoJS.lib.WordArray.random(16);
    const encrypted = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key), {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return iv.toString(CryptoJS.enc.Base64) + ':' + encrypted.toString();
  }

  decryptData(data: string, key: string): string {
    const bytes = CryptoJS.AES.decrypt(data, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
