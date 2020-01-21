import { Component, OnInit, AfterViewInit } from '@angular/core';
import { StorageService } from 'src/app/shared/store/storage.service';
import { OAuthErrorEvent, EventType } from 'angular-oauth2-oidc';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'ms-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.css']
})
export class AuthCallbackComponent implements OnInit, AfterViewInit {
  constructor(private storage: StorageService, private auth: AuthenticationService) { }

  error?: OAuthErrorEvent;
  message: string;
  errorDetails: string[];
  state: string;
  type: EventType;
  reason: string;
  nonce: string;

  ngOnInit() {
    this.nonce = this.storage.getString('nonce');
    this.error = this.storage.get<OAuthErrorEvent>('login-error', true);
    if (this.error) {
      this.type = this.error.type;
      this.reason = JSON.stringify(this.error.reason);
      if (this.error.params) {
        this.message = this.error.params['error'];
        this.errorDetails = this.error.params['error_description'].toString().split('.');
        this.state = this.error.params['state'];
      }
      return;
    }
  }

  ngAfterViewInit() {
  }

  login() {
    this.auth.login();
  }
}
