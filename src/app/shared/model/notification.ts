import { NotificationSeverity } from '../enums/notification-severity';

export class Notification {
  public Title: string;
  public Content: string;
  public Sender: string;
  public CreatedOn: Date;
  public Severity: NotificationSeverity;
}
