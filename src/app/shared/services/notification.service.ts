import { HubConnection, HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import { Injectable } from '@angular/core';
import { Notification } from '../model/notification';
import { ConfigurationService } from './configuration.service';
import { Subject, Subscription } from 'rxjs';

// TODO: use webWorker

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(
    private config: ConfigurationService) {
    this.config.configuration.subscribe(cfg => {
      this.enableNotifications = cfg.enableNotifications;
      if (!cfg.enableNotifications)
        return;

      this.notificationUrl = cfg.signalrBaseUrl + 'signalr';
      this.start();
    });
  }

  private notificationUrl: string;
  private connection: HubConnection;
  private enableNotifications: boolean;
  private notifier: Subject<Notification> = new Subject<Notification>();


  subscribe(next?: (value: Notification) => void, error?: (error: any) => void, complete?: () => void): Subscription {
    return this.notifier.subscribe(next, error, complete);
  }

  notify(notification: Notification) {
    if (!notification) return;

    this.notifier.next(notification);
    this.send(notification);
  }

  private send(notification: Notification): Promise<void> {
    if (!this.enableNotifications) {
      console.warn('notifications disabled', notification);
      return;
    }

    return this.connection.send('Notify', notification);
  }

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
            console.log('[signalr MESSAGE]', notification);
            this.notify(notification);
          });
          console.log('[signalr CONNECTED]', resolved, this.notificationUrl, this.connection);
        },
        (rejected) => {
          console.log('[signalr REJECTED]', rejected, JSON.stringify(rejected, null, 4));
        })
      .catch(
        e => console.log('[signalr FAILED]', e, JSON.stringify(e, null, 4), this.notificationUrl, this.connection));
  }
}
