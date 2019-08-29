import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../../shared/services/authentication.service';

@Component({
  selector: 'ms-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(private auth: AuthenticationService) { }

  // TODO: add user profile editing link
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
