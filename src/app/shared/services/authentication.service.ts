import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor() {
    console.log('INITIALIZING SERVICE: AuthenticationService');
   }

  // TODO: save token in sessionStorage: StorageSerializer
  // TODO: add HostLitener to 'Enter' key event
  // TODO: add B2C implementation
  authenticated = true;
}
