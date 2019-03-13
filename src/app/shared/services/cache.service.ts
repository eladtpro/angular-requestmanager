import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as actions from '../store/actions/generic.action';
import { IEntity } from '../model/ientity';
import { GenericReducer } from '../store/reducers/generic.reducer';
import { IDataService } from '../services/idata.service';

@Injectable({
  providedIn: 'root'
})
export class CacheService<TEntity extends IEntity, TAdapter extends IDataService<TEntity>> {
  constructor(private store: Store<TEntity>, private reducer: GenericReducer<TEntity>, private adapter: TAdapter) {}

  public list(predicate?: (ref: TEntity) => boolean): Observable<TEntity[]> {
    if (null === predicate)
      return this.store.select<TEntity[]>(this.reducer.selectors.selectAll);
    return this.store.select<TEntity[]>(this.reducer.selectors.selectAll)
      .pipe(map(result => result.filter(predicate)));
  }

  public add(entity: TEntity): Observable<TEntity> {
    return this.adapter.add(entity)
      .pipe(tap(e => this.store.dispatch(new actions.Add<TEntity>(e))));
  }

  public update(entity: TEntity) {
    return this.adapter.update(entity)
    .pipe(tap(e => this.store.dispatch( new actions.Update(e))));
  }

  remove(id: number) {
    return this.adapter.remove(id)
    .pipe(tap(e => this.store.dispatch( new actions.Delete(e.Id))));
  }
}
