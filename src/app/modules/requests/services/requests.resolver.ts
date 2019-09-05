import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { EntityCollectionService, EntityServices } from '@ngrx/data';

@Injectable()
export class RequestsResolver implements Resolve<Request[]> {
  constructor(entityServices: EntityServices) {
    console.log('INITIALIZING RESOLVER: RequestsResolver');
    this.requestService = entityServices.getEntityCollectionService('Request');
  }

  requestService: EntityCollectionService<Request>;

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Request[]> {
    console.log('RESOLVING: RequestsResolver');
    return this.requestService.getAll();
  }
}
