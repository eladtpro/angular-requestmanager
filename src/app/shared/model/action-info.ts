import { ActionType } from '../enums/action-type';
export class ActionInfo {
  constructor(public action: ActionType, public title: string) { }
}
