import { HttpParams } from '@angular/common/http';

export function fromPartial<T>(entity: Partial<T>): HttpParams {
  const map: { [param: string]: string } = {};
  Object.getOwnPropertyNames(entity).forEach(
    prop => (map[prop as string] = entity[prop].toString())
  );
  const params = new HttpParams({ fromObject: map });
  return params;
}

export function fromEntity<T, K extends keyof T>(entity: T, propertyNames: K[]): HttpParams {
  const map: { [param: string]: string } = {};
  propertyNames.forEach(
    prop => (map[prop as string] = entity[prop].toString())
  );
  const params = new HttpParams({ fromObject: map });
  return params;
}

export function fromParams<T>(params: HttpParams): (entity: T) => boolean {
  return function(entity) {
    let match = true;
    params.keys().forEach(key => {
      if (params.get(key) !== entity[key]) match = false;
    });
    return match;
  };
}

export function toPredicate<T>(partial: Partial<T>): (entity: T) => boolean {
  return function(entity) {
    let match = true;
    Object.getOwnPropertyNames(partial).forEach(key => {
      if (partial[key] !== entity[key]) match = false;
    });
    return match;
  };
}
