import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { ConfigurationService } from '../../../shared/services/configuration.service';
import { Request } from '../model/request';
import { RequestInfo } from '../model/request-info';
import { Query } from '../model/query';
import { IDataService } from '../../../shared/services/idata.service';

@Injectable({ providedIn: 'root' })
export class WebapibaseService implements IDataService<RequestInfo> {
    private requestUrl: string;
    public requestLoader = new BehaviorSubject<(ref: RequestInfo) => boolean>(r => true);

    constructor(
      private http: HttpClient,
      private config: ConfigurationService) {
      this.requestUrl = this.config.getConfiguration().WebApiBaseUrl + 'requests';
    }

    public list(predicate?: (ref: RequestInfo) => boolean): Observable<RequestInfo[]> {
      const query: Query = new Query();
      return this.http.get<Request[]>(this.requestUrl, {params: query.buildParams()})
        .pipe(
          map(requests => {
            return requests.map(r => new RequestInfo(r)).filter(predicate);
          })
        );
    }

    public get(id: number): Observable<RequestInfo> {
      return this.http.get<Request>(this.requestUrl + id)
        .pipe(
          map(request => {
            return new RequestInfo(request);
          })
        );
    }

    public add(request: RequestInfo): Observable<RequestInfo> {
      return this.http.put<Request>(this.requestUrl, request.Request)
      .pipe(
        map(result => new RequestInfo(result)));
    }

    public update(request: RequestInfo): Observable<RequestInfo> {
      return this.http.post<Request>(this.requestUrl, request.Request)
      .pipe(
        map(result => new RequestInfo(result)));
    }

    public remove(id: number): Observable<RequestInfo> {
      // const idParam = new HttpParams().set('id', request.Request.Id.toString());
      return this.http.delete<Request>(this.requestUrl + id) // , {params: idParam})
        .pipe(
          map(result => new RequestInfo(result))
        );
    }
  }
