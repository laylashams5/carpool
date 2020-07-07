import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators/map';
@Injectable()
export class ApiProvider {
  private data: any = {};

  private opt: RequestOptions;
  private url: string = 'http://192.168.43.109/carpool/system/';
  constructor(public http: Http) {
    console.log('Hello ApiProvider Provider');
  }

  getData(endpoint: string,) {
    const fullUrl: string = this.url + endpoint;
    return  this.http.get(fullUrl).map(res => res.json());
  }

  postData(endpoint: string, data, headers) {
    const fullUrl: string = this.url + endpoint;
    return this.http.post(fullUrl,
      data, this.opt).map(res=>res.json());
  }
  public handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    console.log('Server Error!');
    return Observable.throw(errMsg);
  }
}
