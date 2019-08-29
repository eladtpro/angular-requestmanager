import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { EntityCollectionService, EntityServices } from '@ngrx/data';

@Injectable()
export class RequestsResolver implements Resolve<number> {
  constructor(entityServices: EntityServices) {
    console.log('INITIALIZING RESOLVER: RequestsResolver');
    this.requestService = entityServices.getEntityCollectionService('Request');
  }

  requestService: EntityCollectionService<Request>;

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<number> {
    console.log('RESOLVING: RequestsResolver');
    this.requestService.getAll();
    return this.requestService.count$;
  }
}
