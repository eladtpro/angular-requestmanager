import { Injectable } from '@angular/core';
import { DefaultDataServiceConfig } from '@ngrx/data';
import { ConfigurationService } from '../services/configuration.service';

Injectable();
export class DataServiceConfig extends DefaultDataServiceConfig {
  constructor(private config: ConfigurationService) {
    super();
    console.log('INITIALIZING SERVICE: DataServiceConfig');
    // this.root = 'https://localhost:44371/api';
    // 'http://requestsdemoapi-test.azurewebsites.net/api';
    // this.root = this.config.configuration.webApiBaseUrl;
    this.delete404OK = false; // tells the data service what to do if the server responds to a DELETE request with a 404 - Not Found.

    this.config.subscribe(cfg => {
      this.root = cfg.webApiBaseUrl;
    });

  }
}
