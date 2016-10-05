import {Component, ViewEncapsulation, OnInit} from '@angular/core';

import {BaCard} from '../../theme/components';
import {Http, Headers} from '@angular/http';
import {AuthHttp} from 'angular2-jwt';

import {Router} from '@angular/router-deprecated';


@Component({
  selector: 'logAdmin',
  pipes: [],
  directives: [BaCard],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./logDosen.scss')],
  template: require('./logDosen.html')
})

export class LogDosen implements OnInit {
  private message;
  private status;
  private dosen_id;


  // Data Log
  private id;
  private resLog;

  // Detail Bimbingan
  private resJawaban;
  private resDetail;
  private res;

  // Balas
  private creds;
  private balasan;

  ngOnInit(){
    this.getDataLog();


  }

  constructor(private http: Http, private authHttp: AuthHttp) {
    this.getDataLog();
  }

  getDataLog(){
    this.authHttp.get('http://simak.apps.cs.ipb.ac.id:2016/log/dosen/')
      .map(res => res.json())
      .subscribe(data => {
        this.resLog = data;
      })
  }

  openBimbingan(logId){
    this.id = logId;

    this.authHttp.get('http://simak.apps.cs.ipb.ac.id:2016/log/detail/'+logId)
      .map(res => res.json())
      .subscribe(data => {
        this.resDetail = data;
        if (this.resDetail) this.res = 1;
      })

    this.authHttp.get('http://simak.apps.cs.ipb.ac.id:2016/log/jawaban/'+logId)
      .map(res => res.json())
      .subscribe(data => {
        this.resJawaban = data;
      })
  }

  balas(id){
    this.creds = JSON.stringify({topikId: id, jawaban: this.balasan});

    this.authHttp.post("http://simak.apps.cs.ipb.ac.id:2016/log/balas/dosen/", this.creds)
      .map(res => res.json())
      .subscribe(data => {
        this.status = data['status'];
        this.message = data['message'];

        this.openBimbingan(id);
      }
    )

    this.balasan = "";
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
