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
  public topik;
  public lab;

  public dosen_1;
  public dosen_2;

  public send: string = "ini mahasiswa service";

  constructor(private http: Http){
    this.getLocalStorage();
    this.getDataTA();
  }

  getSend(){
    return this.send;
  }

  getLocalStorage(){
    this.id = localStorage.getItem('id');
    this.nim = localStorage.getItem('nim');
    this.nama = localStorage.getItem('nama');
    this.token = localStorage.getItem('token');
    this.username = localStorage.getItem('username');
    this.status = localStorage.getItem('status');
  }

  getDataTA(){
    this.http.get('http://210.16.120.17:8000/ta/'+this.nim)
      .map(res => res.json())
      .subscribe(data => {
        this.topik = data[0]['topik'];
        this.lab = data[0]['lab'];
        this.dosen_1 = data[0]['dosen1'];
        this.dosen_2 = data[0]['dosen2'];
      })
  }


}