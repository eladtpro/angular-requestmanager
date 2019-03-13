import { IEntity } from './../../model/ientity';
import { Action } from '@ngrx/store';

export const ADD     = '[Action] Add';
export const UPDATE     = '[Action] Update';
export const DELETE     = '[Action] Delete';

export class Add<TEntity extends IEntity> implements Action {
    readonly type = ADD;
    constructor(public entity: TEntity) { }
}

export class Update<TEntity extends IEntity> implements Action {
    readonly type = UPDATE;
    constructor(public entity: TEntity) { }
}

export class Delete implements Action {
    readonly type = DELETE;
    constructor(public id: number) { }
}

export type Actions<TEntity extends IEntity>
= Add<TEntity>
| Update<TEntity>
| Delete;
