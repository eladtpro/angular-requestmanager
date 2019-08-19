import { Component, ViewChild, Renderer2, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { share, tap, map, takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { SubSink } from 'subsink';

import { NotificationService } from '../../shared/services/notification.service';
import { Notification } from '../../shared/model/notification';
import { EntityServices, EntityCollectionService, MergeStrategy } from '@ngrx/data';
import { LoginService } from '../login/services/login.service';
import { PackageTypes } from '../requests/model/package-type';

@Component({
  selector: 'ms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(entityServices: EntityServices, private notificationService: NotificationService, private login: LoginService) {
    this.requestService = entityServices.getEntityCollectionService('Request');
    this.requestService.filteredEntities$.subscribe(requests => {
      console.log('HeaderComponent requestService.filteredEntities$ FILTERED', requests);
    });
  }

  requestService: EntityCollectionService<Request>;
  connectionCount: Observable<string>;
  private subs = new SubSink();
  // @ViewChild('notificationAlert') notificationAlert: TemplateRef<Notification>;
  private notifier: Subject<Notification>;
  notification: Notification;
  PackageTypes = PackageTypes;
  displayName = 'unknown';

  ngOnInit() {
    this.login.authenticate()
    .subscribe(user => {
        this.displayName = user.displayName;
      });
    // this.startNotifications();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    this.notifier.complete();
  }

  startNotifications() {
    this.notificationService.start();
    this.notifier = this.notificationService.notifier;
    this.notifier
      .pipe(takeUntil(this.notifier))
      .subscribe(notification => {
        this.notification = notification;
      });
  }

  // notify(msg: string, title?: string) {
  //   const not = new Notification();
  //   not.Content = msg;
  //   not.Title = title;
  //   this.notification = not;
  // }

  loadRequests(event) {
    this.requestService.getWithQuery({ 'pattern': event.target.value }, { mergeStrategy: MergeStrategy.OverwriteChanges })
    .subscribe(requests => {
      console.log('HeaderComponent requestService.getWithQuery.subscribe RETRIEVED', requests);
    });
  }

// TODO: add doc documents pages

  // reloadData(){
  //   this.requestService.reInitialize(this.dummy.Requests()).subscribe(
  //     () => {
  //       const currentQuery = this.requestService.requestLoader.getValue();
  //       this.requestService.requestLoader.next(currentQuery);
  //     }
  //   );
  // }

  // showModal(){
  //   this.modal.show(new ActionInfo(Action.Add, 'New Request'));
  // }
}
