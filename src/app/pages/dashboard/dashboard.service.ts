import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DashboardService {
  kirim;
  public status = "";
  message;

  constructor(private http: Http){

  }

  getResponse(): Observable<any>{
    return this.http.get("http://localhost:8000/todo/")
      .map(res => res.json());
  }

  postInput(input){
    return this.http.post("http://localhost:8000/todo/", input)
      .map(res => res.json())
  }

  getStatus(){
    return this.status;
  }

}
