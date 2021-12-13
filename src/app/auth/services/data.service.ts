import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  onSaveCookie(name: string, content: any): void{
    this.onSetCookie(name, content);
  }

  onGetCookieStorage(name: string): string | null{
    return localStorage.getItem(name);
  }

  onRemoveCookie(name: string): void{
    localStorage.removeItem(name);
  }

  onRemoveAllCookies(): void{
    localStorage.clear();
  }

  onCheckStorage(name: string): boolean{
    return localStorage.getItem(name) ? true : false;
  }

  isAllowed(path: string | undefined): boolean{
    // if(path === '/'){ return true; }
    const views = JSON.parse(this.onGetCookieStorage('views') || '[]');
    return views.includes(`/main/${path}`);
  }

  private onSetCookie(name: string, content: any): void{
    localStorage.setItem(name,content);
  }
}
