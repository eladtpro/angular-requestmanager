import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { StorageService } from 'src/app/shared/store/storage.service';
import { OAuthErrorEvent, EventType } from 'angular-oauth2-oidc';

@Component({
  selector: 'ms-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.css']
})
export class AuthCallbackComponent implements OnInit {
  constructor(private router: Router, private storage: StorageService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function (future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
      return (future.fragment === curr.fragment);
    };
  }

  error: string;
  errorDetails: string[];
  state: string;
  type: EventType;
  reason: string;
  nonce: string;

  ngOnInit() {
    this.nonce = this.storage.getString('nonce');
    const error: OAuthErrorEvent = this.storage.get<OAuthErrorEvent>('login-error', true);
    if (null != error) {
      this.type = error.type;
      this.reason = JSON.stringify(error.reason);
      if (error.params) {
        this.error = error.params['error'];
        this.errorDetails = error.params['error_description'].toString().split('.');
        this.state = error.params['state'];
      }
      return;
    }

    let redirectUrl: string;
    if (this.storage.contains(StorageService.Keys.REDIRECT_URL_KEY))
      redirectUrl = this.storage.get<string>(StorageService.Keys.REDIRECT_URL_KEY, true);

    this.router.navigateByUrl(redirectUrl || '/');
  }
}
