import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from '../../services/request.service';
import { Request } from '../../model/request';

@Component({
  selector: 'ms-request-grid',
  templateUrl: './request-grid.component.html',
  styleUrls: ['./request-grid.component.css']
})
export class RequestGridComponent implements OnInit {
  requests$: Observable<Request[]>;
  loading$: Observable<boolean>;
  selected: Request;

  constructor(private requestService: RequestService) {
    this.requests$ = requestService.entities$;
  }

  ngOnInit() {
    this.getRequests();
  }

  getRequests() {
    this.requestService.getAll();
    this.close();
  }

  close() {
    this.selected = null;
  }
}
