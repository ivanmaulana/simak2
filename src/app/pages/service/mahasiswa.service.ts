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

  // JWT
  public decode;
  public role;

  // DOSEN
  public dosen_1;
  public dosen_2;

  // PROFILE
  public no;
  public email;
  public nama_ayah;
  public nama_ibu;
  public alamat;
  public alamat_ortu;
  public no_ortu;

  // SIDANG
  public tanggal;
  public jam;
  public tempat;
  public penguji_ketua;
  public penguji_anggota;

  private aaa = 'aaa';

  // URL
  public urlTa = 'http://simak.apps.cs.ipb.ac.id:2016/ta/';
  public urlDataPengajuan = 'http://simak.apps.cs.ipb.ac.id:2016/ta/daftar/';
  public urlDosen = 'http://simak.apps.cs.ipb.ac.id:2016/dosen';
  public urlDaftarPengajuan = 'http://simak.apps.cs.ipb.ac.id:2016/ta/pengajuan/';
  public urlProfile = 'http://simak.apps.cs.ipb.ac.id:2016/profile/';
  public urlSidang = 'http://simak.apps.cs.ipb.ac.id:2016/sidang/';
  public urlStatus = 'http://simak.apps.cs.ipb.ac.id:2016/status';

  public send = 1;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private authHttp: AuthHttp){
    this.getLocalStorage();
    this.getDataTA();
    this.getProfile();
    this.getSidang();
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

  getProfile() {
    this.authHttp.get(this.urlProfile)
      .map(res => res.json())
        .subscribe( data => {
          this.no = data[0]['hp'];
          this.email = data[0]['email'];
          this.alamat = data[0]['alamat'];
          this.nama_ayah = data[0]['namaayah'];
          // console.log(this.nama_ayah);
          this.nama_ibu = data[0]['namaibu'];
          this.alamat_ortu = data[0]['alamatortu'];
          this.no_ortu = data[0]['no_ortu'];
        })
  }

  getAyah() {
    return this.nama_ayah;
  }

  getSidang() {
    this.authHttp.get(this.urlSidang)
      .map(res => res.json())
        .subscribe( data => {
          this.tanggal = data[0]['tanggal'];
          this.jam = data[0]['jam'];
          this.tempat = data[0]['tempat'];
          this.penguji_ketua = data[0]['penguji_ketua'];
          this.penguji_anggota = data[0]['penguji_anggota'];
          // this.no = data[0]['no_hp'];
        })
  }

  getSend(){
    return this.send;
  }

  setSend(params){
    this.send = params;
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
