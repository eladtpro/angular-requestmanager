import { Component, ViewChild, Renderer2, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { share, tap, map, takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { SubSink } from 'subsink';

import { NotificationService } from '../../shared/services/notification.service';
import { Notification } from '../../shared/model/notification';
import { EntityServices, EntityCollectionService, MergeStrategy } from '@ngrx/data';
import { PackageTypes } from '../requests/model/package-type';
import { MatDialog } from '@angular/material';
import { UserDetailsComponent } from '../authentication/user-details/user-details.component';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Router, NavigationEnd } from '@angular/router';
import { ConfigurationService } from '../../shared/services/configuration.service';

@Component({
  selector: 'ms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    private entityServices: EntityServices,
    private notificationService: NotificationService,
    private auth: AuthenticationService,
    private dialog: MatDialog,
    private router: Router,
    private config: ConfigurationService) {
  }

  requestService: EntityCollectionService<Request>;
  connectionCount: Observable<string>;
  private subs = new SubSink();
  // @ViewChild('notificationAlert') notificationAlert: TemplateRef<Notification>;
  private notifier: Subject<Notification>;
  notification: Notification;
  PackageTypes = PackageTypes;
  requestCount = 0;

  public get displayName() {
    return this.auth.name;
  }

  public get authenticated() {
    return this.auth.authenticated;
  }

  ngOnInit() {
    this.config.configuration.subscribe(cfg => {
      this.requestService = this.entityServices.getEntityCollectionService('Request');
      this.subs.sink = this.requestService.filteredEntities$.subscribe(requests => {
        console.log('HeaderComponent requestService.filteredEntities$ FILTERED', requests);
      });

      this.requestService.count$.subscribe(count => this.requestCount = count);
    });

    // TODO: popup user for login
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url.startsWith('/auth'))
          return;

        this.config.configuration.subscribe(cfg => {
          this.auth.initialize(cfg);
        });
      }
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    this.notifier.complete();
  }

  startNotifications() {
    this.notificationService.start();
    this.notifier = this.notificationService.notifier;
    this.subs.sink = this.notifier
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
    this.subs.sink = this.requestService.getWithQuery({ 'pattern': event.target.value }, { mergeStrategy: MergeStrategy.OverwriteChanges })
      .subscribe(requests => {
        console.log('HeaderComponent requestService.getWithQuery.subscribe RETRIEVED', requests);
      });
  }

  userModal() {
    this.dialog.open(UserDetailsComponent, {
      // height: '300px',
      // width: '300px',
      closeOnNavigation: true,
      disableClose: false,
      position: { top: '50px', right: '50px' },
      // panelClass: 'login-dialog-container'
      // data: {}
    });
  }

  login() {
    this.auth.login();
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
