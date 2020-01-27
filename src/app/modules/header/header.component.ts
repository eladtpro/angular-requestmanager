import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SubSink } from 'subsink';
import { EntityServices, EntityCollectionService, MergeStrategy } from '@ngrx/data';
import { PackageType } from '../requests/model/package-type';
import { MatDialog, MatButton, MatSnackBar } from '@angular/material';

import { UserDetailsComponent } from '../authentication/user-details/user-details.component';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { SignupComponent } from '../authentication/signup/signup.component';
import { Router, NavigationEnd } from '@angular/router';
import { StorageService } from '../../shared/store/storage.service';
import { ConfigurationService } from '../../shared/services/configuration.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'ms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    private entityServices: EntityServices,
    private config: ConfigurationService,
    private auth: AuthenticationService,
    private storage: StorageService,
    private router: Router,
    private dialog: MatDialog,
    private notifier: NotificationService,
    private snackBar: MatSnackBar) {
    this.notifier.subscribe(notification => this.snackBar.open(notification.content, notification.title, { duration: 5000 }));
  }

  // ** read ** - True to read a different token from the queried elements.
  // ** static ** - True to resolve query results before change detection runs
  @ViewChild('btnDoc', { static: true }) btnDoc: MatButton;

  btnDocCaption = 'Documentation';
  requestService: EntityCollectionService<Request>;
  private subs = new SubSink();
  PackageTypes = PackageType;
  requestCount = 0;

  public get displayName() {
    return this.auth.name;
  }

  public get authenticated() {
    return this.auth.authenticated;
  }

  ngOnInit() {
    this.config.configuration.subscribe(cfg => {
      // ConfigurationResolver will not dispatch because no routing occur with the header component
      // THIS WILL NEVER FIRE => this.route.data.subscribe((data: { configuration: Configuration }) => {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd)
          this.storage.set(StorageService.Keys.LAST_URL_KEY, this.router.routerState.snapshot.url);
      });
    });
    this.auth.authentication.subscribe(event => {
      if (event.type === 'token_received') {
        this.requestService = this.entityServices.getEntityCollectionService('Request');
        this.subs.sink = this.requestService.filteredEntities$.subscribe(requests => {
          console.log('HeaderComponent requestService.filteredEntities$ FILTERED', requests);
        });
        this.subs.sink = this.requestService.count$.subscribe(count => this.requestCount = count);
      }
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  menuChanged(event) {
    try {
      // const target = event.target || event.srcElement || event.currentTarget;
      console.warn(event.target.innerHTML);
      this.btnDocCaption = event.target.innerHTML;
    } catch { }
  }

  loadRequests(event) {
    this.subs.sink = this.requestService.getWithQuery({ 'pattern': event.target.value }, { mergeStrategy: MergeStrategy.OverwriteChanges })
      .subscribe(requests => {
        console.log('HeaderComponent requestService.getWithQuery.subscribe RETRIEVED', requests);
      });
  }

  userModal() {
    this.dialog.open(UserDetailsComponent, {
      closeOnNavigation: true,
      disableClose: false,
      position: { top: '50px', right: '50px' },
      // panelClass: 'login-dialog-container'
      // data: {}
    });
  }

  login() {
    const dialogRef = this.dialog.open(SignupComponent, {
      closeOnNavigation: true,
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
