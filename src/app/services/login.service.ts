import { Injectable } from '@angular/core';
import { AppService } from './app.service';

@Injectable()
export class LoginService {

  body = {};

  constructor(private appService: AppService) { }

  postNode() {
    this.appService.get('/rest/session/token')
      .subscribe(
        res => {
          this.body['X-CSRF-Token'] = res['_body'];
          console.log(this.appService.post('/entity/node?_format=hal_json', this.body));
        }
      );
  }

}
