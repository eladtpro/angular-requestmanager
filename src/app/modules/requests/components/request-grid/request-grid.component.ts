import { Component, OnInit, ChangeDetectionStrategy, Pipe } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';

import { RequestService } from '../../services/request.service';
import { Request } from '../../model/request';
import { RequestComponent } from '../request/request.component';
import { Action } from '../../../../shared/model/action';
import { PackageTypes } from '../../model/package-type';
import { RequestStatus } from '../../model/request-status';

@Component({
  selector: 'ms-request-grid',
  templateUrl: './request-grid.component.html',
  styleUrls: ['./request-grid.component.css'],
  // TODO: build OnPush dumb & smart components
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestGridComponent implements OnInit {
  constructor(private requestService: RequestService, private dialog: MatDialog) {
    this.requests$ = this.requestService.filteredEntities$;
    this.requestService.entities$.subscribe(requests => {
      this.dataSource = new MatTableDataSource(requests);
      console.log('RequestGridComponent requestService.entities$ CHANGED', requests);
    });
  }

  AActions = Action;
  requests$: Observable<Request[]>;
  loading$: Observable<boolean>;
  selected: Request;
  displayedColumns: string[] = ['id', 'user', 'email', 'packageName', 'packageType', 'status', 'statusChangedOn', 'submittedOn', 'actions'];
  dataSource: MatTableDataSource<Request> = null;
  RequestStatus = RequestStatus;
  PacksgeTypes = PackageTypes;

  ngOnInit() {
    // TODO: cdk virtual scroll
    this.getRequests();
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLocaleLowerCase();
  }

  getRequests() {
    this.requestService.getAll();
    this.close();
  }

  modalRequest(request: Request, action: Action) {
    this.requestService.dialogRef = this.dialog.open(RequestComponent, {
      height: '600px',
      width: '400px',
      closeOnNavigation: true,
      disableClose: false,
      data: { request: request, action }
    });

    this.requestService.dialogRef
      .afterClosed()
      .subscribe((id) => this.getRequests());
  }

  close() {
    this.selected = null;
  }
}
