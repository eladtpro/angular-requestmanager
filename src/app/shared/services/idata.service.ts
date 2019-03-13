import { Observable } from 'rxjs';
import { IEntity } from '../model/ientity';

export interface IDataService<TEntity extends IEntity> {
  list(predicate?: (ref: TEntity) => boolean): Observable<TEntity[]>;
  get(id: number): Observable<TEntity>;
  add(entity: TEntity): Observable<TEntity>;
  update(entity: TEntity): Observable<TEntity>;
  remove(id: number): Observable<TEntity>;
}
