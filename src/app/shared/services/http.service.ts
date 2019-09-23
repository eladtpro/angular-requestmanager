import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigurationService } from './configuration.service';
import { ServiceType } from '../enums/service-type';

@Injectable({ providedIn: 'root' })
export class HttpService {
  constructor(private http: HttpClient, private config: ConfigurationService) {
    this.config.configuration.subscribe(cfg => {
      this.root = cfg.webApiBaseUrl;
    });
  }

  private root: string = null;

  get<T>(url: string, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<T> {
    return this.http.get<T>(url, options);
  }

  getByType<T>(serviceType: ServiceType): Observable<T> {
    const url = `${this.root}/${ServiceType[serviceType]}`;
    return this.http.get<T>(url);
  }
}
