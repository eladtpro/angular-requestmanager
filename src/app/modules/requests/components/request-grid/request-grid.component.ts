import { Component, OnInit, ChangeDetectionStrategy, Pipe } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';

import { RequestService } from '../../services/request.service';
import { Request } from '../../model/request';
import { RequestComponent } from '../request/request.component';
import { Action } from '../../../../shared/model/action';
import { PackageType } from '../../model/package-type';
import { RequestStatus } from '../../model/request-status';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ms-request-grid',
  templateUrl: './request-grid.component.html',
  styleUrls: ['./request-grid.component.css'],
  // TODO: build OnPush dumb & smart components
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestGridComponent implements OnInit {
  constructor(private requestService: RequestService, private dialog: MatDialog, private route: ActivatedRoute) {
    this.requests$ = this.requestService.filteredEntities$;
    this.requestService.entities$.subscribe(requests => {
      this.dataSource = new MatTableDataSource(requests);
    });
  }

  AActions = Action;
  requests$: Observable<Request[]>;
  loading$: Observable<boolean>;
  displayedColumns: string[] = ['key', 'user', 'email', 'packageName', 'packageType', 'status', 'statusChangedOn', 'submittedOn', 'actions'];
  dataSource: MatTableDataSource<Request> = null;
  RequestStatus = RequestStatus;
  PacksgeTypes = PackageType;

  ngOnInit() {
    // TODO: cdk virtual scroll
    // this.getRequests(); // requests are being loaded trough RequestResolver
    this.route.data.subscribe((data: { resolver: Request[] }) => {
      this.dataSource = new MatTableDataSource(data.resolver);
    });
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLocaleLowerCase();
  }

  getRequests() {
    this.requestService.getAll();
  }

  modalRequest(request: Request, action: Action) {
    this.dialog.open(RequestComponent, {
      height: '600px',
      width: '400px',
      closeOnNavigation: true,
      disableClose: false,
      data: { request: request, action: action }
    }).afterClosed()
      .subscribe((result: Request) => {
        if (!result) return;
        switch (action) {
          case Action.Add:
            this.requestService.add(result).subscribe(req => this.getRequests());
            break;
          case Action.Modify:
            this.requestService.update(result).subscribe(req => this.getRequests());
            break;
          case Action.Delete:
            this.requestService.delete(result.key.toString()).subscribe(req => this.getRequests());
            break;
          default:
            throwError('Action required');
            break;
        }
      });
  }
}
