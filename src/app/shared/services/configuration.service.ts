import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { tap, share, take, first } from 'rxjs/operators';
import { Configuration } from '../../shared/model/configuration';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ConfigurationService {
  constructor(private http: HttpClient) {
    console.log('INITIALIZING SERVICE: ConfigurationService');
    this.resolve();
  }

  private config$: BehaviorSubject<Configuration> = new BehaviorSubject(null);
  get configuration(): Configuration { return this.config$.getValue(); }

  resolve(force: boolean = false): Observable<Configuration> {
    if (this.config$.getValue() && !force)
      return this.config$.asObservable();

    return this.http.get<Configuration>(environment.configFile)
      .pipe(
        tap(config => {
          console.log('CONFIGURATION LOADED', config);
          this.config$.next(config);
          if (!config.enableLogging) {
            console.log = function (message?: any, ...optionalParams: any[]): void { };
            console.warn(`console.log TERMINATED: config.enableLogging=${config.enableLogging}`);
          }
        }),
        first(),
        share()
        // take(1)
      );
  }

  subscribe(next?: (value: Configuration) => void, error?: (error: any) => void, complete?: () => void): Subscription {
    return this.resolve().subscribe(next, error, complete);
  }
}
