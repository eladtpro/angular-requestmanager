import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CacheService } from '../../../../shared/services/cache.service';
import { RequestService } from '../../services/request.service';
import { RequestInfo } from '../../model/request-info';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'boi-request-grid',
  templateUrl: './request-grid.component.html',
  styleUrls: ['./request-grid.component.css']
})
export class RequestGridComponent implements OnInit {
  requests: Observable<RequestInfo[]>;
  private cache: CacheService<RequestInfo, RequestService>;

  constructor(cache: CacheService<RequestInfo, RequestService>,
    private notification: NotificationService) { }

  ngOnInit() {
    this.requests = this.cache.list();
  }

}
