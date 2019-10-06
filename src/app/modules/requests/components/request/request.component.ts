import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { throwError, Observable } from 'rxjs';

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
import { NpmResponse } from '../../model/npm-response';
import { NpmService } from '../../services/npm.service';
import { debounceTime, switchMap, finalize, tap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { Overlay } from '@angular/cdk/overlay';

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
    private npm: NpmService,
    private overlay: Overlay,
    @Inject(MAT_DIALOG_DATA) data: { request: Request, action: Action }) {
    this.action = data.action;
    this.request = data.request ? data.request : this.getDefaultRequest();
  }

  readonly request?: Request;
  readonly action: Action = Action.Add;
  loading = false;
  post: any;
  requestForm: FormGroup;
  validator: Validator;

  AActions = Action;
  PackageTypes = PackageType;

  npmAutocomplete$: Observable<NpmResponse[]> = null;

  get user() { return this.requestForm.get('user') as FormControl; }
  get email() { return this.requestForm.get('email') as FormControl; }
  get packageName() { return (this.requestForm.get('package') as FormGroup).get('name') as FormControl; }
  get packageVersion() { return (this.requestForm.get('package') as FormGroup).get('version') as FormControl; }
  get packageType() { return (this.requestForm.get('package') as FormGroup).get('type') as FormControl; }
  get distribution() { return this.requestForm.get('distribution') as FormControl; }

  ngOnInit() {
    this.initializeForm();
    this.initializeAutocomplete();
  }

  initializeForm() {
    this.requestForm = this.formBuilder.group({
      user: [{ value: this.request.user, disabled: true }, [Validators.required/*, Validators.minLength(5), Validators.maxLength(50), this.validateUsername*/]],
      email: [{ value: this.request.email, disabled: true }, [Validators.required/*, Validators.email*/]],
      package: this.formBuilder.group({
        name: [{ value: this.request.package.name, disabled: this.action === Action.Delete }, [Validators.required, Validators.minLength(3), Validators.maxLength(128)]],
        version: [{ value: this.request.package.version, disabled: this.action === Action.Delete }, []],
        type: [{ value: this.request.package.type, disabled: this.action === Action.Delete }, Validators.required]
      }),
      distribution: [{ value: this.request.distribution, disabled: this.action === Action.Delete }]
    });

    // this.requestForm.patchValue(this.request);
    this.validator = new Validator(this.requestForm);
  }

  initializeAutocomplete(): void {
    this.npmAutocomplete$ = this.packageName.valueChanges.pipe(
      // delay emits
      debounceTime(300),
      tap(() => this.loading = true),
      // use switch map so as to cancel previous subscribed events, before creating new once
      switchMap(value => this.npm.search(value).pipe(
        finalize(() => this.loading = false))
      ));
  }

  packageSelected($event: MatAutocompleteSelectedEvent) {
    this.packageVersion.setValue($event.option.id);
  }

  onSubmit() {
    if (!this.requestForm.valid && this.action !== Action.Delete)
      return;

    Object.keys(this.requestForm.value).forEach(key => this.request[key] = this.requestForm.value[key]); // bind form data
    switch (this.action) {
      case Action.Add:
      case Action.Modify:
        this.close(this.action);
        break;
      case Action.Delete:
        const scrollStrategy = this.overlay.scrollStrategies.reposition();
        this.dialog.open(ConfirmationComponent, {
          autoFocus: false,
          height: '200px',
          scrollStrategy,
          data: {
            message: `Are you sure to delete package <strong>${this.request.package.name}@${this.request.package.version}</strong>?`,
            buttonText: { ok: 'Yes', cancel: 'Cancel' }
          }
        })
          .afterClosed().subscribe((confirmed: boolean) => {
            if (confirmed)
              this.close(this.action);
          }
            );
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
    request.user = this.auth.name;
    request.email = this.auth.email;
    request.key = this.newGuid();
    request.package = new Package();
    request.package.version = 'latest';
    request.package.type = PackageType.npm;
    request.submittedOn = new Date();
    request.statusChangedOn = new Date();
    request.status = RequestStatus.Pending;
    request.distribution = DistributionType.Broadcast;
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
