import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Subject} from 'rxjs/Subject';

import {AuthHttp, JwtHelper, tokenNotExpired} from 'angular2-jwt';

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

  // URL
  public urlTa = 'http://210.16.120.17:8100/ta/';
  public urlDataPengajuan = 'http://210.16.120.17:8100/ta/daftar/';
  public urlDosen = 'http://210.16.120.17:8100/dosen';
  public urlDaftarPengajuan = 'http://210.16.120.17:8100/ta/pengajuan/';
  public urlProfile = 'http://210.16.120.17:8100/profile/';

  // URL LOG


  // JWT
  public decode;
  public role;


  public dosen_1;
  public dosen_2;

  public send;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: Http, private authHttp: AuthHttp){
    this.getLocalStorage();
    this.getDataTA();

    console.log('ini service');

    // this.test = 'awal';
  }

  getLocalStorage(){
    this.token = localStorage.getItem('id_token');

    this.decode = this.jwtHelper.decodeToken(this.token);
    this.id = this.decode['id'];
    this.nim = this.decode['nim'];
    this.nama = this.decode['nama'];
    this.role = this.decode['role'];
  }

  getDataTA(){
    this.authHttp.get(this.urlTa)
      .map(res => res.json())
      .subscribe(data => {
        this.topik = data[0]['topik'];
        this.lab = data[0]['lab'];
        this.dosen_1 = data[0]['dosen1'];
        this.dosen_2 = data[0]['dosen2'];
      })
  }

  getSend(){
    return this.send;
  }

  setSend(params){
    this.send = params;
    console.log(this.getSend());
    return this.send;
  }


}
