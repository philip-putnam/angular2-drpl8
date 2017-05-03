import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [LoginService]
})
export class HomeComponent implements OnInit {


  constructor(private loginService: LoginService) { }

  ngOnInit() {
    

  }

  // login(userName: string, userPassword: string) {
  //   this.loginService.login(userName, userPassword);
  // }

}
