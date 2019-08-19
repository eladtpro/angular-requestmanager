import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { throwError } from 'rxjs';

import { Action } from '../../../../shared/model/action';
import { Request } from '../../model/request';
import { Package } from '../../model/package';
import { PackageTypes } from '../../model/package-type';
import { RequestService } from '../../services/request.service';
import { RequestStatus } from '../../model/request-status';
import { DistributionType } from '../../model/distribution-type';
import { Guid } from '../../../../shared/model/guid';
import { Validator } from '../../../../shared/core/validator';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationComponent } from '../../../dialogs/confirmation.component';


@Component({
  selector: 'ms-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private requestService: RequestService, private route: ActivatedRoute,
    private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: { request: Request, action: Action }) {
    this.action = data.action;
    this.request = data.request ? data.request : this.getDefaultRequest();
  }

  readonly request?: Request;
  readonly action: Action = Action.Add;
  post: any;
  requestForm: FormGroup;
  validator: Validator;

  AActions = Action;
  PacksgeTypes = PackageTypes;
  PacksgeTypesValues: string[] = Object.values(PackageTypes).filter(Number);
  @ViewChild(ElementRef, { static: false }) selectPackageType: ElementRef;


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
      user: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(50), this.validateUsername]],
      email: [null, [Validators.required, Validators.email]],
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
        this.requestService.add(this.request).subscribe(req => {
          this.requestService.getAll();
        });
        break;
      case Action.Modify:
        this.requestService.update(this.request);
        break;
      case Action.Delete:
        const dialogRef = this.dialog.open(ConfirmationComponent, {
          data: {
            message: `Are you sure to delete package ${this.request.package.name}?`,
            buttonText: {
              ok: 'Yes',
              cancel: 'No'
            }
          }
        });

        dialogRef.afterClosed().subscribe((confirmed: boolean) => {
          if (confirmed)
            this.requestService.delete(this.request.id);
        });


        // if (confirm('Are you sure to delete package ' + this.request.package.name))
        //   this.requestService.delete(this.request.id);
        break;
      default:
        throwError('Action required');
        break;
    }
    this.requestService.dialogRef.close(this.request.id);
  }

  private validateUsername(control: AbstractControl) {
    const username: string = control.value;
    return (!username /*&& username.toLowerCase() !== username*/) ? { 'invalidValue': 'must be all lowercase' } : null;
  }

  private getDefaultRequest(): Request {
    const request = new Request();
    request.package = new Package();
    request.package.type = PackageTypes.npm;
    request.submittedOn = new Date();
    request.statusChangedOn = new Date();
    request.status = RequestStatus.Pending;
    request.correlationKey = Guid.newGuid();
    request.distribution = DistributionType.Broadcust;
    return request;
  }
}
