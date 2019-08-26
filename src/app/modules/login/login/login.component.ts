import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { LoginService } from '../services/login.service';
import { User } from '../../../shared/model/user';

@Component({
  selector: 'ms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private login: LoginService) { }

  @ViewChild(TemplateRef, { static: true }) loginform: TemplateRef<any>;
  user: User;
  displayForm = false;

  ngOnInit() {
    this.user = this.login.user;
  }

  toggleForm(display: boolean) {
    this.displayForm = display;
  }
}
