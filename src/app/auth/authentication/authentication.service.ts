import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {
  private status: string = "ivan";

  constructor(private http: Http){

  }

  getStatus(){
    return this.status;
  }

}
