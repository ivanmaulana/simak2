import {Injectable} from '@angular/core';
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

  // JWT
  public decode;
  public role;


  public dosen_1;
  public dosen_2;

  public send = 1;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private authHttp: AuthHttp){
    this.getLocalStorage();
    this.getDataTA();
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

  ubahTanggal(date){
    let tahun = date.substr(0,4);
    let bulan = date.substr(5,2);
    let tanggal = date.substr(8,2);

    if (tanggal.substr(0,1) == 0) tanggal = tanggal.substr(1,1);

    if (bulan == 1) bulan = 'Januari';
    else if (bulan == 2) bulan = 'Februari';
    else if (bulan == 3) bulan = 'Maret';
    else if (bulan == 4) bulan = 'April';
    else if (bulan == 5) bulan = 'Mei';
    else if (bulan == 6) bulan = 'Juni';
    else if (bulan == 7) bulan = 'Juli';
    else if (bulan == 8) bulan = 'Agustus';
    else if (bulan == 9) bulan = 'September';
    else if (bulan == 10) bulan = 'Oktober';
    else if (bulan == 11) bulan = 'November';
    else if (bulan == 12) bulan = 'Desember';

    let kirim = tanggal+' '+bulan+' '+tahun;

    return kirim;

  }


}
