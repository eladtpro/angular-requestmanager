import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { Request } from '../model/request';


@Injectable({ providedIn: 'root' })
export class RequestService extends EntityCollectionServiceBase<Request> {
  constructor(serviceElementFactory: EntityCollectionServiceElementsFactory) {
    super('Request', serviceElementFactory);
    console.log('INITIALIZING SERVICE: RequestService');
  }
}
