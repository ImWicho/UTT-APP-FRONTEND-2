import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor() { }

  convertFileToBase64(file: File): Promise<string | ArrayBuffer | null>{
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => {
        reject(error);
      };
    });
  }

  convertBase64ToFile(fileBase64: string, name: string): Promise<File> {
    const url = fileBase64;
    const type = url.substring(url.indexOf(':') + 1, url.indexOf(';base64'));
    return new Promise((resolve, reject) => {
      fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], name, { type });
        resolve(file);
      })
      .catch((error) => {
        reject(error);
      });
    });
  }
}
