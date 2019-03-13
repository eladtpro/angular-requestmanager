import { environment } from 'src/environments/environment';

export class Configuration {
  public get Production() {
    return environment.production;
  }
  constructor(
    public WebApiBaseUrl: string,
    public SignalrBaseUrl: string,
    public FirebaseUrl: string,
    public FirebaseConfig: any) {}
}
