import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import {Observable} from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class MessageService {

  constructor(private  http : Http) { 
  }

  private messageUrl = 'http://localhost:3020/hello';

  // check api testing with api call

  getHello() : Promise<any>  {
      return this.http.get(this.messageUrl).toPromise().then((response) =>
      {
          console.log(response.json());

      }, (error) => {
          console.log(error);
      })
    }
}
