import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class PengajuanService {
  private send;

  constructor(private http: Http){

  }

  getResponse(){
    return this.http.get("http://localhost:8000/ta/daftar")
      .map(res => res.json());
  }

  postInput(input){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post("http://localhost:8000/ta/daftar", input, {headers: headers})
      .map(res => res.json())
  }

  getSend(){
    return this.send;
  }

  setSend(params){
    this.send = params;
    return this.send;
  }

}
