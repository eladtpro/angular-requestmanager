import { Request } from './request';
import { PackageType } from './package-type';
import { IEntity } from 'src/app/shared/model/ientity';

export class RequestInfo implements IEntity {
  public get id() {
    return this.request.id;
  }
  public Key: string;
  // tslint:disable-next-line:no-shadowed-variable
  constructor(public request: Request, public iconUrl?: string, public caption?: string) {
    switch (request.package.type) {
      case PackageType.Angular:
        this.iconUrl = '../../../../../assets/images/nodejslogo.png';
        this.caption = 'nodejs package';
        break;
      case PackageType.Nuget:
        this.iconUrl = '../../../../../assets/images/packageDefaultIcon_nuget.png';
        this.caption = 'nuget package';
        break;
      default:
        this.iconUrl =  '../../../../../assets/images/blank256.png';
        this.caption = 'unknown';
    }
  }
}
