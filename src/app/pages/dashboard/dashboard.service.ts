import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DashboardService {
  kirim;
  public status = "";
  message;

  constructor(private http: Http){

  }

  getResponse(){
    return this.http.get("http://localhost:8000/todo/")
      .map(res => res.json());
  }

  postInput(input){
    this.http.post("http://localhost:8000/todo/", input)
      .map(res => res.json())
      .subscribe(data => {
        this.status = data[0].status;
        this.message = data[0].message;
      }
    )

    console.log(this.status);
    console.log(this.message);

    return JSON.stringify({status: this.status, message: this.message});

  }

  getStatus(){
    return this.status;
  }

}
