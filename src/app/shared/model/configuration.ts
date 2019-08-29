import { environment } from '../../../environments/environment';
import { AuthConfig } from 'angular-oauth2-oidc';

export class Configuration {
  constructor() {
    this.oidcConfig = {
      // URL of the SPA to redirect the user to after login
      redirectUri: window.location.origin + '/auth',
    };
  }
  enableNotifications: boolean;
  webApiBaseUrl: string;
  signalrBaseUrl: string;
  oidcConfig: AuthConfig;
  discoveryDocumentUrl: string;

  public get production() {
    return environment.production;
  }
}
