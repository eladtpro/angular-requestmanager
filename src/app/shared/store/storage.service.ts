import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { StorageKeys } from './storage-keys';

@Injectable({ providedIn: 'root' })
export class StorageService {
  static readonly Keys: StorageKeys = new StorageKeys();

  private propertyChanged: ReplaySubject<string> = new ReplaySubject<string>(1);

  get changed(): Observable<string> {
    return this.propertyChanged.asObservable();
  }

  set(key: string, value: any): StorageService {
    const str = JSON.stringify(value);
    sessionStorage.setItem(key, str);
    this.propertyChanged.next(key);
    return this;
  }

  getString(key: string): string {
    return sessionStorage.getItem(key);
  }

  get<T>(key: string, remove?: boolean): T {
    const str = sessionStorage.getItem(key);
    const obj = JSON.parse(str);
    if (remove)
      this.remove(key);
    return obj as T;
  }

  remove(key: string): void {
    sessionStorage.removeItem(key);
    this.propertyChanged.next(key);
  }

  contains(key: string): boolean {
    const str = sessionStorage.getItem(key);
    return (null != str);
  }
}
