import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { share, tap } from 'rxjs/operators';

export class Interceptor implements HttpInterceptor {
  private static Connections: BehaviorSubject<number> = new BehaviorSubject(0);

  public get connections() {
    return Interceptor.Connections;
  }

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const copy = req.clone({headers: req.headers.append('auth', 'someToken')});
    return next.handle(request).pipe(
      tap(event => {
        switch (event.type) {
          case HttpEventType.Sent:
            // The request was sent out over the wire.
            this.connections.next(this.connections.getValue() + 1);
            console.log('INTERCEPTED: Sent', this.connections.getValue(), request.url);
            break;
          case HttpEventType.UploadProgress:
            // An upload progress event was received.
          case HttpEventType.ResponseHeader:
            // The response status code and headers were received.
          case HttpEventType.DownloadProgress:
            // A download progress event was received.
          case HttpEventType.User:
            // A custom event from an interceptor or a backend.
            break;
          case HttpEventType.Response:
            // The full response including the body was received.
            this.connections.next(this.connections.getValue() - 1);
            console.log('INTERCEPTED: Response', this.connections.getValue(), request.url);
            break;
          default:
            break;
        }
      }));
  }
}
