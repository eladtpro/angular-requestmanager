import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../../shared/services/authentication.service';

@Component({
  selector: 'ms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthenticationService) { }

  @ViewChild(TemplateRef, { static: true }) loginform: TemplateRef<any>;
  displayName: string;
  email: string;
  displayForm = false;

  public get tokenExpiration(): Date {
    return new Date(this.auth.tokenExpiration);
  }

  logout(): void {
    this.auth.logout();
  }

  ngOnInit() {
    this.displayName = this.auth.name;
    this.email = this.auth.email;
  }

  loadUserProfile(): Promise<any> {
    return this.auth.loadUserProfile();
  }

}
