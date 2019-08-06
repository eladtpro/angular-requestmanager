import { DefaultDataServiceConfig } from '@ngrx/data';
import { Injectable } from '@angular/core';
import { ConfigurationService } from '../services/configuration.service';

Injectable();
export class DataServiceConfig extends DefaultDataServiceConfig {
  constructor(private config: ConfigurationService) {
    super();
    this.root = 'https://localhost:44371/api';
    // 'http://requestsdemoapi-test.azurewebsites.net/api';
    // this.config.subscribe(c => {
    //   this.root = this.config.configuration.webApiBaseUrl;
    // });
  }
}
