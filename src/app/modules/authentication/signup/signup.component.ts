import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'ms-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
  }

  login() {
    this.auth.login();
  }
}
