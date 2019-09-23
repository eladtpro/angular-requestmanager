import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler, HttpEventType } from '@angular/common/http';
import { SpinnerService } from './spinner.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SpinnerInterceptor implements HttpInterceptor {

  constructor(private spinner: SpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(event => {
        switch (event.type) {
          case HttpEventType.Sent:
            // The request was sent out over the wire.
            this.spinner.toggle(true);
            break;
          case HttpEventType.Response:
            // The full response including the body was received.
            this.spinner.toggle(false);
            break;
          default:
            break;
        }
      }));
  }
}
