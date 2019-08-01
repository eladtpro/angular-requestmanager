import { environment } from 'src/environments/environment';

export class FirebaseConfiguration {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
}

export class Configuration {
  enableLogging: boolean;
  webApiBaseUrl: string;
  signalrBaseUrl: string;
  firebaseUrl: string;
  firebaseConfig: FirebaseConfiguration;

  public get production() {
    return environment.production;
  }
}
