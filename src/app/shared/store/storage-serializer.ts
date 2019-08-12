export class StorageSerializer {
  static set(key: string, value: any): void {
    const str = JSON.stringify(value);
    sessionStorage.setItem(key, str);
  }

  static get<T>(type: (new () => T), key: string): T {
    const str = sessionStorage.getItem(key);
    const obj = JSON.parse(str);
    return Object.assign(new type, obj);
  }

  static remove(key: string): void {
    sessionStorage.removeItem(key);
  }
}
