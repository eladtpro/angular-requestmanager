import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigurationService } from './configuration.service';
import { ServiceType } from '../enums/service-type';

@Injectable({ providedIn: 'root' })
export class HttpService {
  constructor(private http: HttpClient, private config: ConfigurationService) {
    this.root = this.config.configuration.webApiBaseUrl;
  }

  private root: string = null;

  get<T>(serviceType: ServiceType): Observable<T> {
    const url = `${this.root}/${ServiceType[serviceType]}`;
    return this.http.get<T>(url);
  }
}
