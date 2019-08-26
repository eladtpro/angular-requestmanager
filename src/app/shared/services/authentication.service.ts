import { Injectable, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';
import { OAuthService, OAuthEvent } from 'angular-oauth2-oidc';
import { ConfigurationService } from './configuration.service';


@Injectable({ providedIn: 'root' })
export class AuthenticationService implements OnDestroy {
  // https://www.npmjs.com/package/@azure/msal-angular
  constructor(private oauth: OAuthService, private config: ConfigurationService) {
    console.log('INITIALIZING SERVICE: AuthenticationService');
    this.oauth.configure(this.config.configuration.oidcConfig);
    this.oauth.setupAutomaticSilentRefresh();
    this.oauth.loadDiscoveryDocument(this.config.configuration.discoveryDocumentUrl);
    this.oauth.tryLogin();
  }

  // Sample: Get the dispaly name claim
  public get name(): string {
    const claims = this.oauth.getIdentityClaims();
    if (!claims)
      return null;

    return claims['name'];
  }

  public get email(): string {
    const claims = this.oauth.getIdentityClaims();
    if (!claims)
      return null;
    return claims['emails'];
  }

  public get authenticated(): boolean {
    return this.oauth.hasValidAccessToken();
  }

  // Sample: Get the access token
  public get token() {
    return this.oauth.getAccessToken();
  }

  // Sample: Get the access token expiration date (in date format)
  public get tokenExpiration(): Date {
    return new Date(this.oauth.getAccessTokenExpiration());
  }

  // TODO: add HostLitener to 'Enter' key event
  private subs = new SubSink();

  login(): void {
    console.log('AuthenticationService.login', this.authenticated);

    if (this.authenticated) return;
    this.oauth.initImplicitFlowInternal();
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

  loadUserProfile(): Promise<any> {
    return this.oauth.loadUserProfile();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
