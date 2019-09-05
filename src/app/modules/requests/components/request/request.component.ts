import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { throwError } from 'rxjs';

import { Action } from '../../../../shared/model/action';
import { Request } from '../../model/request';
import { Package } from '../../model/package';
import { PackageType } from '../../model/package-type';
import { RequestStatus } from '../../model/request-status';
import { DistributionType } from '../../model/distribution-type';
import { Validator } from '../../../../shared/core/validator';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationComponent } from '../../../dialogs/confirmation.component';
import { AuthenticationService } from '../../../../shared/services/authentication.service';

@Component({
  selector: 'ms-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  constructor(private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<RequestComponent>,
    private auth: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) data: { request: Request, action: Action }) {
    this.action = data.action;
    this.request = data.request ? data.request : this.getDefaultRequest();
  }

  readonly request?: Request;
  readonly action: Action = Action.Add;
  post: any;
  requestForm: FormGroup;
  validator: Validator;

  AActions = Action;
  PackageTypes = PackageType;

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
      user: [{ value: this.request.user, disabled: true }, [Validators.required/*, Validators.minLength(5), Validators.maxLength(50), this.validateUsername*/]],
      email: [{ value: this.request.email, disabled: true }, [Validators.required/*, Validators.email*/]],
      package: this.formBuilder.group({
        name: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(128)]],
        type: [null, Validators.required]
      }),
      distribution: [null]
    });

    this.requestForm.patchValue(this.request);
    this.validator = new Validator(this.requestForm);
  }

  onSubmit() {
    if (!this.requestForm.valid)
      return;

    Object.keys(this.requestForm.value).forEach(key => this.request[key] = this.requestForm.value[key]); // bind form data
    switch (this.action) {
      case Action.Add:
      case Action.Modify:
        this.close(this.action);
        break;
      case Action.Delete:
        this.dialog.open(ConfirmationComponent, {
          data: {
            message: `Are you sure to delete package ${this.request.package.name}?`,
            buttonText: { ok: 'Yes', cancel: 'Cancel' }
          }
        })
          .afterClosed().subscribe((confirmed: boolean) => {
            if (confirmed)
              this.close(this.action);
          });
        break;
      default:
        throwError('Action required');
        break;
    }
  }

  private close(action: Action) {
    this.dialogRef.close(this.request);
  }

  private validateUsername(control: AbstractControl) {
    const username: string = control.value;
    return (!username /*&& username.toLowerCase() !== username*/) ? { 'invalidValue': 'must be all lowercase' } : null;
  }

  private getDefaultRequest(): Request {
    const request = new Request();
    request.user = this.auth.name,
      request.email = this.auth.email;
    request.key = this.newGuid();
    request.package = new Package();
    request.package.type = PackageType.npm;
    request.submittedOn = new Date();
    request.statusChangedOn = new Date();
    request.status = RequestStatus.Pending;
    request.distribution = DistributionType.Broadcust;
    return request;
  }

  private newGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      // tslint:disable-next-line:no-bitwise
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
