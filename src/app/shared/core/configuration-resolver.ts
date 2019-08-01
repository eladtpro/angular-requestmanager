import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Configuration } from '../model/configuration';
import { ConfigurationService } from '../services/configuration.service';
import { Observable } from 'rxjs';

@Injectable()
export class ConfigurationResolver implements Resolve<Configuration> {
  constructor(private configService: ConfigurationService) {
    console.log('INITIALIZING SERVICE: ConfigurationResolver');
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Configuration> {
    return this.configService.resolve();
  }
}
