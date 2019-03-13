import { Injectable } from '@angular/core';
import { AngularFireDatabase, PathReference } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RequestInfo } from '../model/request-info';
import { IDataService } from '../../../shared/services/idata.service';

@Injectable({ providedIn: 'root' })
export class FirebaseService implements IDataService<RequestInfo> {
  private readonly path: PathReference;

  constructor(private firebase: AngularFireDatabase) {
    this.path = '/' + RequestInfo.name + '/';
   }

  public list(predicate?: (ref: RequestInfo) => boolean): Observable<RequestInfo[]> {
    return this.firebase.list<RequestInfo>(this.path).snapshotChanges()
    .pipe(map(actions => {
      return actions.map(ac => {
        const request: RequestInfo = ac.payload.val();
        request.Key = ac.key;
        return request;
      }).filter(predicate);
    }));
  }

  public get(id: number): Observable<RequestInfo> {
    return this.firebase.list<RequestInfo>(this.path,
      dbref => dbref.orderByChild('Id').equalTo(id.toString()))
      .valueChanges().pipe(map(requests => requests.length > 0 ? requests[0] : null));
  }

  public add(entity: RequestInfo): Observable<RequestInfo> {
    // this.firebase.createPushId()
    entity.Request.Id = Math.floor(Math.random() * 100) + 1;

    const ref = this.firebase.list<RequestInfo>(this.path);
    ref.push(entity);
    return ref.valueChanges(['child_added']).pipe(
      map(results => results.find(r => r.Request.CorrelationKey === entity.Request.CorrelationKey))
    );
  }

  public update(entity: RequestInfo): Observable<RequestInfo> {
    const ref = this.firebase.object<RequestInfo>(this.path + entity.Key);
    ref.update(entity);
    return this.firebase.object<RequestInfo>(this.path + entity.Key).valueChanges();
  }

  public remove(id: number): Observable<RequestInfo> {
    const lst = this.firebase.list<RequestInfo>(this.path,
      dbref => dbref.orderByChild('Id').equalTo(id.toString()));
    lst.remove();
    return lst.valueChanges(['child_removed'])
      .pipe(map(requests => requests.length > 0 ? requests[0] : null));
  }

  public reInitialize(requests: RequestInfo[]): Observable<RequestInfo[]> {
    requests.map(req => {
      this.firebase.list<RequestInfo>(RequestInfo.name).push(req);
    });

    return this.list();
  }
}
