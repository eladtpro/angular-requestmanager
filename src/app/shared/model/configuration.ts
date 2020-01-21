import { environment } from '../../../environments/environment';
import { AuthConfig } from 'angular-oauth2-oidc';
import { Levenshtein } from './levenshtein';

export class Configuration {
  enableNotifications: boolean;
  webApiBaseUrl: string;
  npmRepositoryUrl: string;
  signalrBaseUrl: string;
  oidcConfig: AuthConfig;
  levenshtein: Levenshtein;
  discoveryDocumentUrl: string;

  public get production() {
    return environment.production;
  }
}
