import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MahasiswaService {
  public id;
  public nim;
  public nama;
  public status;
  public token;
  public username;

  public send: string = "ini mahasiswa service";

  constructor(private http: Http){
    this.getLocalStorage();
  }

  getSend(){
    return this.send;
  }

  getLocalStorage(){
    this.id = localStorage.getItem('id');
    this.nim = localStorage.getItem('nim');
    this.nama = localStorage.getItem('token');
    this.token = localStorage.getItem('token');
    this.username = localStorage.getItem('username');
    this.status = localStorage.getItem('status');
  }


}
