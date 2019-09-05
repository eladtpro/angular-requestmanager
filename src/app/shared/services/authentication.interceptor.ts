import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { ConfigurationService } from './configuration.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private auth: AuthenticationService, private config: ConfigurationService) {
    console.log('INITIALIZING INTERCEPTOR: AuthenticationInterceptor');
    this.config.configuration.subscribe(cfg => this.webApiBaseUrl = cfg.webApiBaseUrl);
  }
  private webApiBaseUrl = '';

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.authenticated && request.url.startsWith(this.webApiBaseUrl))
      request = request.clone({
        setHeaders: { Authorization: `OpenIdConnect ${this.auth.token}` },
        withCredentials: true
      });

    return next.handle(request);
  }
}
