import { DistributionType } from './distribution-type';
import { Package } from './package';
import { RequestStatus } from './request-status';
import { IEntity } from 'src/app/shared/model/ientity';

export class Request implements IEntity {
  public key: string ;
  public user: string;
  public email: string;
  public package: Package ;
  public submittedOn: Date ;
  public status: RequestStatus;
  public statusChangedOn: Date;
  public distribution: DistributionType;
}
