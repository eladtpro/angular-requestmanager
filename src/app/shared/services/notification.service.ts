import { HubConnection, HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import { Notification } from '../model/notification';
import { ConfigurationService } from './configuration.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class NotificationService {
  constructor(private config: ConfigurationService) {
    console.log('INITIALIZING SERVICE: NotificationService');

    this.config.subscribe(configuration => {
      this.notificationUrl = configuration.webApiBaseUrl + 'signalr';
      this.start();
    });
  }

  public notifier: Subject<Notification> = new Subject<Notification>();;
  private notificationUrl: string;
  private connection: HubConnection;

  async start() {
    // return this.notifier;

    this.connection = new HubConnectionBuilder()
      .withUrl(this.notificationUrl, {
        // skipNegotiation:true,
        // transport: HttpTransportType.WebSockets,
        logMessageContent: true,
        logger: LogLevel.Debug
        // accessTokenFactory?(): string | Promise<string>
      })
      // .configureLogging(LogLevel.Debug/*LogLevel.Trace*/)
      .build();


    console.log('[signalr CONNECTING]', this.notificationUrl, this.connection);
    await this.connection
      .start()
      .then(
        (resolved) => {
          this.connection.on('notify', notification => {
            console.log(notification);
            this.notifier.next(notification);
          });
          console.log('[signalr CONNECTED]', resolved, this.notificationUrl, this.connection);
        },
        (rejected) => {
          console.log('[signalr REJECTED]', rejected, JSON.stringify(rejected, null, 4));
        })
      .catch(
        e => console.log('[signalr FAILED]', e, JSON.stringify(e, null, 4), this.notificationUrl, this.connection));


    // return this.notifier;
  }

  public send(notification: Notification): Promise<void> {
    return this.connection.send('Notify', notification);
  }

  // public get(): Observable<Notification>{
  //   return Observable.create();
  // }
}
