import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Configuration } from '../../shared/model/configuration';
import { environment } from '../../../environments/environment';

@Injectable()
export class ConfigurationService {
  constructor(private http: HttpClient) {
    console.log('INITIALIZING SERVICE: ConfigurationService');
  }

  private config$: BehaviorSubject<Configuration> = new BehaviorSubject(null);

  get configuration(): Configuration {
    return this.config$.getValue();
  }
  set configuration(config: Configuration) {
    this.config$.next(config);
    console.log = function (message?: any, ...optionalParams: any[]): void {
      console.assert(config.enableLogging, message, optionalParams);
    };
  }

  resolve(force: boolean = false): Observable<Configuration> {
    if (null !== this.config$.getValue() && !force)
      return of(this.config$.getValue());

    return this.http.get<Configuration>(environment.configFile)
    .pipe(
      tap(config => this.configuration = config)
    );
  }

  subscribe(callback: (configuration: Configuration) => void) {
    this.config$
      .subscribe((config) => {
        if (config === null)
          return;
        callback(config);
      });
  }
}
