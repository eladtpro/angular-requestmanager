import { Component, Inject } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { StorageService } from 'src/app/shared/store/storage.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ms-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  constructor(@Inject(MAT_DIALOG_DATA) data: any, private auth: AuthenticationService, private storage: StorageService) {
    if (data)
      this.redirectUrl = data.redirectUrl;
  }

  private readonly redirectUrl: string;

  login() {
    if (this.redirectUrl)
      this.storage.set(StorageService.Keys.REDIRECT_URL_KEY, this.redirectUrl);
    this.auth.login();
  }
}
