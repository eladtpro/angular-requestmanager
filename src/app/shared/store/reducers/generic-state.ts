import { IEntity } from '../../model/ientity';
import { EntityState } from '@ngrx/entity';

export interface GenericState<TEntity extends IEntity> extends EntityState<TEntity> { }
