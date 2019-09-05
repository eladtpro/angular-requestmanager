import { HttpParams } from '@angular/common/http';
import { RequestStatus } from './request-status';
import { PackageType } from './package-type';

export class Query {

  constructor(public status?: RequestStatus, public type?: PackageType, public pattern?: string) { }

  public buildParams(): HttpParams {
    return new HttpParams()
      .set('status', this.status ? this.status.toString() : null)
      .set('type', this.type ? this.type.toString() : null)
      .set('pattern', this.pattern ? this.pattern : '');
  }
}
