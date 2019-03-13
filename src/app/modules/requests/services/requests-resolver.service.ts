import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CacheService } from 'src/app/shared/services/cache.service';
import { RequestService } from './request.service';
import { RequestInfo } from '../model/request-info';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestsResolverService implements Resolve<boolean> {
  constructor(private cache: CacheService<RequestInfo, RequestService>) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.cache.list().pipe(
      map(requests => true),
      take(1)
    );
  }

}
