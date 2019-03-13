import { Component, ViewChild, Renderer2, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { share, tap, map } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';

import { Interceptor } from '../../shared/core/interceptor';
// import { ModalService } from './../../services/modal.service';
// import { NotificationService } from './../../services/notification.service';
// import { Component, OnInit, OnDestroy, ViewChild, Renderer2, ElementRef } from '@angular/core';
// import { RequestService } from '../../services/request.service';
// import { ActionInfo } from '../../models/action-info';
// import { Action } from '../../models/action';
 import { Notification } from '../../shared/model/notification';
// import { DummyService } from './../../services/dummy.service';

@Component({
  selector: 'boi-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('connectionCount') public connectionCount: Observable<string>;
  @ViewChild('logo') public logo: ElementRef;
  // @ViewChild('notificationAlert') notificationAlert: TemplateRef<Notification>;
  private notifier: Subject<Notification>;

  public notification: Notification;
  public logoUrl = '../../../../../assets/images/microsoft.png';

  constructor(
    public interceptor: Interceptor,
    private renderer: Renderer2,
    // private notificationService: NotificationService
    ) { }


  ngOnInit() {
    this.connectionCount = this.interceptor.connections.pipe(
      tap(activeConnections => {
        // console.log('HeaderComponent', activeConnections);
        this.logoUrl = 0 !== activeConnections ?
          '../../../../../assets/images/colorful_loader.gif' :
          '../../../../../assets/images/microsoft.png';
        this.renderer.setAttribute(this.logo.nativeElement, 'src', this.logoUrl);
      }),
      map(activeConnections => activeConnections > 0 ? activeConnections.toString() : ''),
      share());

    // this.notificationService.start();
    // this.notifier = this.notificationService.notifier;//this.notificationService.start();
    // this.notifier
    //   .pipe(takeUntil(this.notifier))
    //   .subscribe(notification => {
    //     this.notification = notification;
    // });
  }

  ngOnDestroy() {
    console.log('HeaderComponent: OnDestroy');

    this.notifier.complete();
  }

  loadRequests(event) {
    // this.requestService.searchPattern.next(event.target.value);
  }

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
