import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class PengajuanService {
  constructor(private http: Http){

  }

  getResponse(): Observable<any>{
    return this.http.get("http://localhost:8000/ta/daftar")
      .map(res => res.json());
  }

  postInput(input){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post("http://localhost:8000/ta/daftar", input, {headers: headers})
      .map(res => res.json())
  }

  getStatus(){
    // return this.status;
  }

}
