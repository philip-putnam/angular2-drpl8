import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {

  private serverURL: string = 'http://localhost:8888';
  private csrfToken: string;
  private headers: Headers = new Headers(
    {
      'Accept': 'application/json',
      'Content-Type': 'application/hal+jason'
    }
  );

  constructor(private http: Http) { }

  getUrl(url: string): string {

    return this.serverURL + url;
  }

  getOptions(options: RequestOptionsArgs): RequestOptionsArgs{

    let op = {headers: this.headers};


    return Object.assign(op, options);
  }

  get(endpoint: string, options?: RequestOptionsArgs): Observable<Response>{

    let url = this.getUrl(endpoint);

    let op = this.getOptions(options);

    return this.http.get(url, op);
  }

  post(endpoint: string, body: any, options?: RequestOptionsArgs): Observable<Response>{

    let url = this.getUrl(endpoint);
    let op = new Headers(
      {
        'Accept': 'application/json',
        'Content-Type': 'application/hal+jason',
        'X-CSRF-Token': body['X-CSRF-Token']
      }
    );

    let newNode = {
      '_links': {
        'type': {
          'href': 'http://localhost:8888/rest/type/node/article'
        }
      },
      'type': {
        'target_id': 'article'
      },
      'title': {
        'value': 'Example node title'
      }
    };

    console.log(op);
    this.http.post(url, newNode, op).subscribe(res => console.log(res));

    return this.http.post(url, newNode, op);
  }

  put(endpoint: string, body: any, options?: RequestOptionsArgs): Observable<Response>{

    let url = this.getUrl(endpoint);
    let op = this.getOptions(options);
    return this.http.put(url, body, op);
  }

  delete(endpoint: string, options?: RequestOptionsArgs): Observable<Response>{

    let url = this.getUrl(endpoint);
    let op = this.getOptions(options);

    return this.http.delete(url, op);
  }
}
