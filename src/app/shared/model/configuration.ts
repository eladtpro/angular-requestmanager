import { environment } from '../../../environments/environment';
import { AuthConfig } from 'angular-oauth2-oidc';

export class Configuration {
  enableNotifications: boolean;
  webApiBaseUrl: string;
  npmRepositoryUrl: string;
  signalrBaseUrl: string;
  oidcConfig: AuthConfig;
  discoveryDocumentUrl: string;

  public get production() {
    return environment.production;
  }
}
