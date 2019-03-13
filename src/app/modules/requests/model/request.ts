import { DistributionType } from './distribution-type';
import { Package } from './package';
import { RequestStatus } from './request-status';
import { Guid } from '../../../shared/model/guid';
import { IEntity } from 'src/app/shared/model/ientity';

export class Request implements IEntity {
  public Id: number ;
  public User: string;
  public Email: string;
  public Package: Package ;
  public SubmittedOn: number ;
  public Status: RequestStatus;
  public StatusChangedOn: number;
  public CorrelationKey: Guid;
  public Distribution: DistributionType;
}
