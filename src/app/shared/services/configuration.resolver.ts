import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Configuration } from '../../shared/model/configuration';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { ConfigurationService } from './configuration.service';

@Injectable({ providedIn: 'root' })
export class ConfigurationResolver implements Resolve<Configuration> {
  constructor(private config: ConfigurationService) {
    this.config = config;
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Configuration> {
    return this.config.configuration;
  }
}
