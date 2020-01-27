import { Component, Inject, HostListener, AfterViewInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { StorageService } from 'src/app/shared/store/storage.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButton } from '@angular/material';

@Component({
  selector: 'ms-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements AfterViewInit {
  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    private auth: AuthenticationService,
    private storage: StorageService) {
    if (data)
      this.redirectUrl = data.redirectUrl;
  }

  private readonly redirectUrl: string;

  @ViewChild('btnLogin', { static: false }) btnLogin: MatButton;
  @ViewChild('btnCancel', { static: false }) btnCancel: MatButton;


  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    console.log(event);
    if (event.key === 'Enter')
      this.login();
    else if (event.key === 'Escape')
      this.btnCancel._elementRef.nativeElement.click();
  }

  ngAfterViewInit(): void {
    this.btnLogin.focus();
  }

  login() {
    if (this.redirectUrl)
      this.storage.set(StorageService.Keys.REDIRECT_URL_KEY, this.redirectUrl);
    this.auth.login();
  }
}
