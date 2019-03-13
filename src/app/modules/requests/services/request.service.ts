import { ConfigurationService } from './../../../shared/services/configuration.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { RequestInfo } from '../model/request-info';
import { IDataService } from '../../../shared/services/idata.service';
import { FirebaseService } from './firebase.service';
import { WebapibaseService } from './webapibase.service';

@Injectable({ providedIn: 'root' })
export abstract class RequestService implements IDataService<RequestInfo> {
  private readonly repository: IDataService<RequestInfo>;
  constructor(private injector: Injector, private config: ConfigurationService) {
    this.repository = config.getConfiguration().Production ?
      injector.get<FirebaseService>(FirebaseService) :
      injector.get<WebapibaseService>(WebapibaseService);
  }
  public get(id: number): Observable<RequestInfo> {
    return this.get(id);
  }

  public list(predicate?: (ref: RequestInfo) => boolean): Observable<RequestInfo[]> {
    return this.list(predicate);
  }

  public add(request: RequestInfo): Observable<RequestInfo> {
    return this.add(request);
  }

  public update(request: RequestInfo): Observable<RequestInfo> {
    return this.update(request);
  }

  public remove(id: number): Observable<RequestInfo> {
    return this.remove(id);
  }
}
