import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../store/storage.service';

@Injectable({ providedIn: 'root' })
export class PersistUrlInterceptor implements HttpInterceptor  {

  constructor(private state: RouterStateSnapshot, private storage: StorageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.storage.set(StorageService.REDIRECT_URL_KEY, this.state.url);
    return next.handle(request);
  }
}
