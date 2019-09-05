import { Injectable } from '@angular/core';
import { DefaultDataServiceConfig } from '@ngrx/data';
import { ConfigurationService } from '../services/configuration.service';

Injectable({ providedIn: 'root' });
export class DataServiceConfig extends DefaultDataServiceConfig {
  constructor(private config: ConfigurationService) {
    super();
    this.config.configuration.subscribe(cfg => {
      this.root = cfg.webApiBaseUrl;
    });
    this.delete404OK = false; // tells the data service what to do if the server responds to a DELETE request with a 404 - Not Found.
  }
}
