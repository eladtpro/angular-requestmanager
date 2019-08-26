import { Injectable, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';
import { OAuthService, OAuthEvent } from 'angular-oauth2-oidc';
import { ConfigurationService } from './configuration.service';


@Injectable({ providedIn: 'root' })
export class AuthenticationService implements OnDestroy {
  // https://www.npmjs.com/package/@azure/msal-angular
  constructor(private oauth: OAuthService, private config: ConfigurationService) {
    console.log('INITIALIZING SERVICE: AuthenticationService');

    this.config.subscribe(cfg => {
      this.oauth.configure(cfg.oidcConfig);
      this.oauth.setupAutomaticSilentRefresh();
      this.oauth.loadDiscoveryDocument('https://b2cpm.onmicrosoft.com/b2cpm.onmicrosoft.com/B2C_1_basic-authentication/v2.0/.well-known/openid-configuration');
      this.oauth.tryLogin();
    });
  }

  // Sample: Get the dispaly name claim
  public get name() {
    const claims = this.oauth.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return claims['name'];
  }

  // Sample: Get the access token
  public get token() {
    return this.oauth.getAccessToken();
  }

  // Sample: Get the access token expiration ticks (numeric)
  public get tokenExpiration() {
    return new Date(this.oauth.getAccessTokenExpiration());
  }

  // Sample: Get the access token expiration date (in date format)
  public get tokenExpirationDate() {
    return this.oauth.getAccessTokenExpiration();
  }

  // TODO: save token in sessionStorage: StorageSerializer
  // TODO: add HostLitener to 'Enter' key event
  // TODO: add B2C implementation
  authenticated = true;
  private subs = new SubSink();

  login(): void {
    this.oauth.initImplicitFlow();
  }

  logout(): void {
    this.oauth.logOut();
  }
  // Sample: Call this function before using the access token, to make sure you have a valid access token
  getToken(): Promise<OAuthEvent> {
    if (!this.oauth.hasValidAccessToken()) {
      console.log('Refreshing the token');
      return this.oauth.silentRefresh();
    } else
      console.log('Token is still valid');
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
