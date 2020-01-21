import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import { OAuthService, OAuthEvent, OAuthSuccessEvent } from 'angular-oauth2-oidc';
import { Configuration } from '../model/configuration';
import { StorageService } from '../store/storage.service';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ConfigurationService } from './configuration.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService implements OnDestroy {
  constructor(
    private router: Router,
    private oauth: OAuthService,
    private storage: StorageService,
    private config: ConfigurationService) {
    this.config.configuration.subscribe(cfg => {
      // ConfigurationResolver will not dispatch because no routing occur with the header component
      // THIS WILL NEVER FIRE => this.route.data.subscribe((data: { configuration: Configuration }) => {
      this.initialize(cfg);
    });
  }

  // TODO: add HostListener to 'Enter' key event
  private subs = new SubSink();
  authentication: Subject<OAuthEvent> = new Subject<OAuthEvent>();
  initialize(cfg: Configuration) {

    this.oauth.configure(cfg.oidcConfig);
    this.oauth.setupAutomaticSilentRefresh();
    this.oauth.loadDiscoveryDocument(cfg.discoveryDocumentUrl)
      .then(result =>
        // This method just tries to parse the token(s) within the url when
        // the auth-server redirects the user back to the web-app
        // It doesn't send the user the the login page
        this.oauth.tryLogin().catch(err => {
          this.storage.set('login-error', err);
          console.error(err);
        }));
    this.subs.sink = this.oauth.events
      .pipe(tap((event: OAuthEvent) => this.authentication.next(event)))
      .subscribe((event: OAuthEvent) => {
        console.log(`[${event.type}]  ${new Date()}`, event);
        // TODO: show notifications
        switch (event.type) {
          case 'discovery_document_loaded':
            const success = event as OAuthSuccessEvent;
            if (success.info) {
              const loggedOut = this.storage.get<boolean>('logged-out', true);
              if (loggedOut)
                this.router.navigateByUrl('/home');
            }
            break;
          case 'token_received':
            let redirectUrl: string;
            if (this.storage.contains(StorageService.Keys.REDIRECT_URL_KEY))
              redirectUrl = this.storage.get<string>(StorageService.Keys.REDIRECT_URL_KEY, true);
            this.router.navigateByUrl(redirectUrl || '/home');
            break;
          case 'logout':
            this.storage.set('logged-out', true);
            break;
          default:
            break;
        }
      });
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
    if (claims['emails'] && claims['emails'].length)
      return claims['emails'][0];
    return claims['emails'];
  }

  public get newUser(): string {
    const claims = this.oauth.getIdentityClaims();
    if (!claims)
      return null;

    return claims['newUser'];
  }

  public get authenticated(): boolean {
    return (this.oauth.hasValidIdToken() && this.oauth.hasValidAccessToken());
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
    if (this.authenticated) return;
    this.oauth.initImplicitFlow();
  }

  logout(): void {
    this.oauth.logOut();
  }

  loadUserProfile(): Promise<any> {
    return this.oauth.loadUserProfile();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
