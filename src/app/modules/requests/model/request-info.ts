import { Request } from './request';
import { PackageType } from './package-type';
import { IEntity } from 'src/app/shared/model/ientity';

export class RequestInfo implements IEntity {
  public get Id() {
    return this.Request.Id;
  }
  public Key: string;
  // tslint:disable-next-line:no-shadowed-variable
  constructor(public Request: Request, public IconUrl?: string, public Caption?: string) {
    switch (Request.Package.Type) {
      case PackageType.Angular:
        this.IconUrl = '../../../../../assets/images/nodejslogo.png';
        this.Caption = 'nodejs package';
        break;
      case PackageType.Nuget:
        this.IconUrl = '../../../../../assets/images/packageDefaultIcon_nuget.png';
        this.Caption = 'nuget package';
        break;
      default:
        this.IconUrl =  '../../../../../assets/images/blank256.png';
        this.Caption = 'unknown';
    }
  }
}
