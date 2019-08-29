import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Configuration } from '../../shared/model/configuration';

@Injectable()
export class ConfigurationService {
  constructor(private http: HttpClient) {
    console.log('INITIALIZING SERVICE: ConfigurationService');
  }

  // NGRX initialization issue - in case of early access - pre config initialization
  private config$: ReplaySubject<Configuration> = new ReplaySubject<Configuration>(1);
  get configuration(): Observable<Configuration>  {
    return this.config$;
  }

  resolve(url: string): Promise<Configuration> {
    console.log('EXECUTING SERVICE: ConfigurationService.load');
    return this.http.get<Configuration>(url)
      .pipe(
        tap(config => {
          console.log('CONFIGURATION LOADED', config);
          config.oidcConfig.redirectUri = window.location.origin + '/auth';
          this.config$.next(config);
        })
      ).toPromise();
  }
}
