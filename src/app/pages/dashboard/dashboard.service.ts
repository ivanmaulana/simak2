import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DashboardService {

  constructor(private http: Http){

  }

  getResponse(){
    return this.http.get("http://localhost:8000/todo/")
      .map(res => res.json());
  }

}
