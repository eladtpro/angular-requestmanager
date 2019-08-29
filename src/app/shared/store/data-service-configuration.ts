import { Injectable } from '@angular/core';
import { DefaultDataServiceConfig } from '@ngrx/data';
import { ConfigurationService } from '../services/configuration.service';

Injectable({ providedIn: 'root' });
export class DataServiceConfig extends DefaultDataServiceConfig {
  constructor(private config: ConfigurationService) {
    super();
    console.log('INITIALIZING SERVICE: DataServiceConfig');
    this.config.configuration.subscribe(cfg => {
      console.log('SETTING ROOT ADDRESS: DataServiceConfig', cfg.webApiBaseUrl);
      this.root = cfg.webApiBaseUrl;
    });
    this.delete404OK = false; // tells the data service what to do if the server responds to a DELETE request with a 404 - Not Found.
  }
}
