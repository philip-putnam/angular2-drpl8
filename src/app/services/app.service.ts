import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {

  private serverURL: string = 'localhost:8888';
  constructor(private http: Http) { }

  getUrl(url: string): string {

    return this.serverURL + url;
  }

  get(endpoint: string, options?: RequestOptionsArgs): Observable<Response>{

    let url = this.getUrl(endpoint);

    return this.http.get(url, options);
  }

  post(endpoint: string, body: any, options?: RequestOptionsArgs): Observable<Response>{

    let url = this.getUrl(endpoint);

    return this.http.post(url, body, options);
  }

  put(endpoint: string, body: any, options?: RequestOptionsArgs): Observable<Response>{

    let url = this.getUrl(endpoint);

    return this.http.put(url, body, options);
  }

  delete(endpoint: string, options?: RequestOptionsArgs): Observable<Response>{

    let url = this.getUrl(endpoint);

    return this.http.delete(url, options);
  }
}
