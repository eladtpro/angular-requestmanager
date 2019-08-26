import { environment } from '../../../environments/environment';
import { AuthConfig } from 'angular-oauth2-oidc';

export class Configuration {
  constructor() {
    this.oidcConfig = {
      // URL of the SPA to redirect the user to after login
      redirectUri: window.location.origin + '/',
    };
  }
  enableLogging: boolean;
  enableNotifications: boolean;
  webApiBaseUrl: string;
  signalrBaseUrl: string;
  oidcConfig: AuthConfig;

  public get production() {
    return environment.production;
  }
}
