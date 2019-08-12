import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { MatDialogRef } from '@angular/material/dialog';
import { Request } from '../model/request';
import { BehaviorSubject } from 'rxjs';
import { AbstractControl } from '@angular/forms';


@Injectable({ providedIn: 'root' })
export class RequestService extends EntityCollectionServiceBase<Request> {
  constructor(serviceElementFactory: EntityCollectionServiceElementsFactory) {
    super('Request', serviceElementFactory);
    console.log('INITIALIZING SERVICE: RequestService');
  }

  dialogRef: MatDialogRef<any>;
  modalDialogToggled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}
