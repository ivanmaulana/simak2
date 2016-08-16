import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DataService {
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

  getLocalStorage() {
    this.id = localStorage.getItem('id');
    this.nim = localStorage.getItem('nim');
    this.nama = localStorage.getItem('nama');
    this.token = localStorage.getItem('token');
    this.username = localStorage.getItem('username');
    this.status = localStorage.getItem('status');
  }

  getDataMahasiswa() {

  }

}
