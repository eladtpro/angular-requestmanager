import { DistributionType } from './distribution-type';
import { Package } from './package';
import { RequestStatus } from './request-status';
import { Guid } from '../../../shared/model/guid';
import { IEntity } from 'src/app/shared/model/ientity';

export class Request implements IEntity {
  public id: number ;
  public user: string;
  public email: string;
  public package: Package ;
  public submittedOn: Date ;
  public status: RequestStatus;
  public statusChangedOn: Date;
  public correlationKey: Guid;
  public distribution: DistributionType;
}
