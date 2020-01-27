import { Component, OnInit, ChangeDetectionStrategy, Pipe, Inject } from '@angular/core';
import { Observable, throwError, combineLatest } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
// import { VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';
// import { TableVirtualScrollStrategy } from '../../services/table-virtual-scroll-strategy.service';

import { RequestService } from '../../services/request.service';
import { Request } from '../../model/request';
import { RequestComponent } from '../request/request.component';
import { Action } from '../../../../shared/model/action';
import { PackageType } from '../../model/package-type';
import { RequestStatus } from '../../model/request-status';
// import { map } from 'rxjs/operators';

// TODO: cdk virtual scroll
// https://stackoverflow.com/questions/55688326/angular-why-input-value-changes-using-renderer2-doesnt-trigger-the-events
// https://stackblitz.com/edit/nahgrin-virtual-scroll-table?file=src%2Fapp%2Ftable%2Ftable.component.ts

@Component({
  selector: 'ms-request-grid',
  templateUrl: './request-grid.component.html',
  styleUrls: ['./request-grid.component.css'],
  // providers: [{
  //   provide: VIRTUAL_SCROLL_STRATEGY,
  //   useClass: TableVirtualScrollStrategy,
  // }],

  // TODO: build OnPush dumb & smart components
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestGridComponent implements OnInit {
  constructor(
    // @Inject(VIRTUAL_SCROLL_STRATEGY) private readonly scrollStrategy: TableVirtualScrollStrategy,
    private requestService: RequestService,
    private dialog: MatDialog) {
    this.requests$ = this.requestService.filteredEntities$;
    this.requestService.entities$.subscribe(requests => {
      // this.requests = requests;
      this.dataSource = new MatTableDataSource(requests);
    });
  }

  // Manually set the amount of buffer and the height of the table elements
  // static BUFFER_SIZE = 3;
  // rowHeight = 48;
  // headerHeight = 56;
  // gridHeight = 400;

  AActions = Action;
  requests$: Observable<Request[]>;
  loading$: Observable<boolean>;
  displayedColumns: string[] = ['key', 'user', 'email', 'packageName', 'packageVersion', 'packageType', 'status', 'statusChangedOn', 'submittedOn', 'actions'];
  dataSource: MatTableDataSource<Request> = null; // Observable<Array<Request>>;
  RequestStatus = RequestStatus;
  PackageTypes = PackageType;
  requests: Request[] = [];


  ngOnInit() {
    // const range = Math.ceil(this.gridHeight / this.rowHeight) + RequestGridComponent.BUFFER_SIZE;
    // this.scrollStrategy.setScrollHeight(this.rowHeight, this.headerHeight);

    // this.dataSource = combineLatest([this.requests, this.scrollStrategy.scrolledIndexChange]).pipe(
    //   map((value: any) => {

    //     // Determine the start and end rendered range
    //     const start = Math.max(0, value[1] - RequestGridComponent.BUFFER_SIZE);
    //     const end = Math.min(value[0].length, value[1] + range);

    //     // Update the datasource for the rendered range of data
    //     return value[0].slice(start, end);
    //   })
    // );

    this.getRequests();
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
    }).afterClosed().subscribe((result: Request) => {
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
    }
    );
  }
}
