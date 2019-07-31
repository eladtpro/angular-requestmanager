import { Injectable } from '@angular/core';
import {
    EntityCollectionServiceBase,
    EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { Request } from '../model/request';

@Injectable()
export class RequestService extends EntityCollectionServiceBase<Request> {
    constructor(serviceElementFactory: EntityCollectionServiceElementsFactory) {
        super('Request', serviceElementFactory);
    }
}
