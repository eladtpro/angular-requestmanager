import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Storage {
  private propertyChanged: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  get changed(): Observable<string> {
    return this.propertyChanged.asObservable();
  }

  set(key: string, value: any): void {
    const str = JSON.stringify(value);
    sessionStorage.setItem(key, str);
    this.propertyChanged.next(key);
  }

  get<T>(key: string): T {
    const str = sessionStorage.getItem(key);
    const obj = JSON.parse(str);
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

  // get<T>(type: (new () => T), key?: string): T {
  //   const storageKey = key ? key : type.name;
  //   const str = sessionStorage.getItem(storageKey);
  //   const obj = JSON.parse(str);
  //   return Object.assign(new type(), obj);
  // }
}
