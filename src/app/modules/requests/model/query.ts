import { HttpParams } from "@angular/common/http";
import { RequestStatus } from "./request-status";
import { PackageTypes } from "./package-type";

export class Query {

  constructor(public status?: RequestStatus, public type?: PackageTypes, public pattern?: string) { }

  public buildParams(): HttpParams {
    return new HttpParams()
    .set('status', this.status ? this.status.toString() : null)
    .set('type', this.type ? this.type.toString() : null)
    .set('pattern', this.pattern ? this.pattern : '');
  }
}
