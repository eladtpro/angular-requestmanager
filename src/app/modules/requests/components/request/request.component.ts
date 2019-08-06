import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { throwError } from 'rxjs';
// import { DatePipe } from '@angular/common';

import { Action } from '../../../../shared/model/action';
import { Request } from '../../model/request';
import { Package } from '../../model/package';
import { PackageType } from '../../model/package-type';
import { RequestService } from '../../services/request.service';
import { RequestStatus } from '../../model/request-status';
import { DistributionType } from '../../model/distribution-type';
import { Guid } from '../../../../shared/model/guid';
import { Validator } from '../../../../shared/core/validator';

@Component({
  selector: 'ms-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private requestService: RequestService) { }

  @Input() request?: Request;
  @Input() action: Action = Action.Add;
  post: any;
  requestForm: FormGroup;
  validator: Validator;

  PacksgeTypes = PackageType;
  packsgeTypesKeys: string[] = Object.keys(PackageType).filter(Number);

  get user() { return this.requestForm.get('user') as FormControl; }
  get email() { return this.requestForm.get('email') as FormControl; }
  get packageName() { return (this.requestForm.get('package') as FormGroup).get('name') as FormControl; }
  get packageType() { return (this.requestForm.get('package') as FormGroup).get('type') as FormControl; }
  get distribution() { return this.requestForm.get('distribution') as FormControl; }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.requestForm = this.formBuilder.group({
      user: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(20), this.validateLowerUsername]],
      email: [null, [Validators.required, Validators.email]],
      package: this.formBuilder.group({
        name: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(128)]],
        type: [null, Validators.required]
      }),
      distribution: [null]
    });
    if (!this.request)
      this.request = this.getDefaultRequest();
    this.requestForm.patchValue(this.request);
    this.validator = new Validator(this.requestForm);
  }

  onSubmit() {
    if (!this.requestForm.valid)
      return;

    Object.keys(this.requestForm.value).forEach(key => this.request[key] = this.requestForm.value[key]); // bind form data
    // this.request.submittedOn =  this.datePipe.transform(this.request.submittedOn, 'dd-MM-yyyy');

    switch (this.action) {
      case Action.Add:
        this.requestService.add(this.request);
        break;
      case Action.Modify:
        this.requestService.update(this.request);
        break;
      case Action.Delete:
        this.requestService.delete(this.request.id);
        break;
      default:
        throwError('Action required');
        break;
    }
  }

  private validateLowerUsername(control: AbstractControl) {
    const username: string = control.value;
    return (username && username.toLowerCase() !== username) ? { 'invalidValue': 'must be all lowercase' } : null;
  }

  private getDefaultRequest(): Request {
    const request = new Request();
    request.package = new Package();
    request.package.type = PackageType.Angular;
    request.submittedOn = new Date();
    request.statusChangedOn = new Date();
    request.status = RequestStatus.Pending;
    request.correlationKey = Guid.newGuid();
    request.distribution = DistributionType.Broadcust;
    return request;
  }
}
