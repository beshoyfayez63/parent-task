import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class LocalStorageService {
  get<T>(key: string): T | null {
    const value = localStorage.getItem(key);
    if (!value) return null;
    try {
      return JSON.parse(value) as T;
    } catch (e) {
      console.warn(e);
      return null ;
    }
  }

  set(key: string, value: any): LocalStorageService {
    localStorage.setItem(key, JSON.stringify(value));
    return this;
  }

  remove(key:string): LocalStorageService {
    localStorage.removeItem(key);
    return this;
  }
}
