import { createEntityAdapter, EntityAdapter, EntityState, Update } from '@ngrx/entity';
import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import { Injectable } from '@angular/core';

import { GenericState } from './generic-state';
import { IEntity } from './../../model/ientity';
import * as actions from '../actions/generic.action';
import { EntitySelectors } from '@ngrx/entity/src/models';

@Injectable({ providedIn: 'root' })
export class GenericReducer<TEntity extends IEntity> {
  adapter: EntityAdapter<TEntity>;
  initialState: EntityState<TEntity>;
  selector: MemoizedSelector<object, GenericState<TEntity>>;

  public get selectors(): EntitySelectors<TEntity, object> {
    return this.adapter.getSelectors(this.selector);
  }

  constructor() {
    this.adapter = createEntityAdapter<TEntity>();
    this.initialState = this.adapter.getInitialState({
      ids: [],
      entities: { }
    });

    this.selector = createFeatureSelector<GenericState<TEntity>>(this.constructor.name);
  }

  reducer(state: GenericState<TEntity> = this.initialState, action: actions.Actions<TEntity>) {

    switch (action.type) {
      case actions.ADD:
          return this.adapter.addOne(action.entity, state);

      case actions.UPDATE:
        const changes = Object.assign({}, {id: action.entity.Id, changes: action.entity});
        return this.adapter.updateOne(changes[0], state);

      case actions.DELETE:
          return this.adapter.removeOne(action.id, state);
      default:
          return state;
    }
  }
}
