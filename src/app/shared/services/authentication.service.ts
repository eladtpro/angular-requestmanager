import { Injectable, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';
import { OAuthService, OAuthEvent } from 'angular-oauth2-oidc';
import { ConfigurationService } from './configuration.service';
import { Configuration } from '../model/configuration';
import { StorageService } from '../store/storage.service';


@Injectable({ providedIn: 'root' })
export class AuthenticationService implements OnDestroy {
  constructor(private oauth: OAuthService, private config: ConfigurationService, private storage: StorageService) {
    console.log('INITIALIZING SERVICE: AuthenticationService');
  }

  // TODO: add HostLitener to 'Enter' key event
  private initialized = false;
  private subs = new SubSink();

  initialize(cfg: Configuration) {
    if (!cfg || this.initialized)
      return;

    console.log('SETTING OIDC CONFIGURATION: AuthenticationService', cfg.webApiBaseUrl);
    this.oauth.configure(cfg.oidcConfig);
    this.oauth.setupAutomaticSilentRefresh();
    this.oauth.loadDiscoveryDocument(cfg.discoveryDocumentUrl);
    this.initialized = true;
  }

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

  login(): void {
    console.log('AuthenticationService.login', this.authenticated);
    if (this.authenticated)
      return;

    this.oauth.tryLogin()
      .catch(err => {
        this.storage.set('login-error', err);
        console.error(err);
      })
      .then(result => {
        if (!this.oauth.hasValidAccessToken())
          this.oauth.initImplicitFlow();
      });
  }

  logout(): void {
    this.oauth.logOut();
  }
  // Sample: Call this function before using the access token, to make sure you have a valid access token
  silentRefresh(): Promise<OAuthEvent> {
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
