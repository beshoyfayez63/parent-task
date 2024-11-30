import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class LocalStorageService {
  get<T>(key: string): T | null {
    return localStorage.getItem(key) as T | null;
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
