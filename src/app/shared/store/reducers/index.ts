import { ActionReducerMap } from '@ngrx/store';
import { RequestInfo } from '../../../modules/requests/model/request-info';
import { GenericReducer } from './generic.reducer';

export const reducers: ActionReducerMap<any> = {
    request: new GenericReducer<RequestInfo>().reducer
};
