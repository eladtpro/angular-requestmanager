import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Configuration } from '../../shared/model/configuration';

@Injectable()
export class ConfigurationService {
  private config: Configuration;

  constructor(private http: HttpClient, ) {}

  load(url: string) {
    return new Promise(resolve => {
      this.http
        .get<Configuration>(url)
        .pipe(
          switchMap(config => {
            this.config = config;
            return of(true);
          })
        )
        .subscribe(() => { // no need to unsubscribe - angular takes care of his own
          // console.log('[RequestManager] finished loading app');
          resolve();
        });
    });
  }
  getConfiguration(): Configuration {
    return this.config;
  }
}
