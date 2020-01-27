import { NotificationSeverity } from '../enums/notification-severity';

export class Notification {
  constructor(content: string, title?: string) {
    this.content = content;
    this.title = title;
  }

  public title: string;
  public content: string;
  public sender: string;
  public createdOn: Date;
  public severity: NotificationSeverity;
}
