import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class DashboardService {

  constructor(private http: Http){

  }

  getResponse(){
    return this.http.get("http://greentransport.ipb.ac.id/api/rank")
      .map(res => res.json());
  }

}
