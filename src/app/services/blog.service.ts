import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Injectable()
export class BlogService {

  constructor(private appService: AppService) { }

  getPosts():Observable<any> {
    return this.appService.get('/api/blog').map(res => res.json()).catch(err => Observable.throw(err));
  }
}
