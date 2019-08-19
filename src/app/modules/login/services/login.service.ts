import { Injectable } from '@angular/core';
import { HttpService } from '../../../shared/services/http.service';
import { User } from '../../../shared/model/user';
import { ServiceType } from 'src/app/shared/enums/service-type';
import { Storage } from '../../../shared/store/storage';
import { tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private http: HttpService, private storage: Storage) { }

  authenticate(): Observable<User> {
    if (this.storage.contains('user'))
      return of(this.storage.get('user'));

    return this.http.get<User>(ServiceType.login).pipe(
      tap(
        user => {
          this.storage.set('user', user);
        })
    );
  }
}
