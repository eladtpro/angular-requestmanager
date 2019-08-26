import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Subscription, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Configuration } from '../../shared/model/configuration';

@Injectable()
export class ConfigurationService {
  constructor(private http: HttpClient) {
    console.log('INITIALIZING SERVICE: ConfigurationService');
  }

  private loaded$ = new Subject<Configuration>();
  private config: Configuration = null;
  get configuration(): Configuration { return this.config; }

  subscribe(next?: (value: Configuration) => void, error?: (error: any) => void, complete?: () => void): Subscription {
    return this.loaded$.subscribe(next, error, complete);
  }

  resolve(url: string): Promise<Configuration> {
    console.log('EXECUTING SERVICE: ConfigurationService.load');
    return this.http.get<Configuration>(url)
      .pipe(
        tap(config => {
          console.log('CONFIGURATION LOADED', config);
          config.oidcConfig.redirectUri = window.location.origin + '/';
          this.config = config;
          this.loaded$.next(this.config);
        })
      ).toPromise();
  }
}
