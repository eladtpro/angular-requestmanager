import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { SignupComponent } from '../../modules/authentication/signup/signup.component';

@Injectable({ providedIn: 'root' })
export class AuthenticationGuard implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router, private dialog: MatDialog) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
    if (this.auth.authenticated)
      return true;

    this.dialog.open(SignupComponent, {
      closeOnNavigation: true,
      disableClose: false,
      data: { redirectUrl: state.url }
    });

    return false;
  }
}
