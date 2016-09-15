import {Component, ViewEncapsulation, OnInit, ElementRef} from '@angular/core';
import {CORE_DIRECTIVES, NgClass, NgStyle, FORM_DIRECTIVES, } from '@angular/common';
import {TAB_DIRECTIVES, DATEPICKER_DIRECTIVES, AlertComponent, PROGRESSBAR_DIRECTIVES} from 'ng2-bootstrap';
import {Http, Headers} from '@angular/http';
import {MahasiswaService} from '../service';
import {AuthHttp, JwtHelper, tokenNotExpired} from 'angular2-jwt';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';

import {BaCard} from '../../theme/components';

@Component({
  selector: 'sidang',
  pipes: [],
  providers: [MahasiswaService, ToastsManager],
  directives: [BaCard, AlertComponent, TAB_DIRECTIVES, CORE_DIRECTIVES, NgClass, NgStyle, PROGRESSBAR_DIRECTIVES, FORM_DIRECTIVES],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./sidang.scss')],
  template: require('./sidang.html')
})

export class Sidang {
  private nim;
  private nama;
  private topik;
  private lab;
  private dosen_1;
  private dosen_2;
  private tanggal;
  private jam;
  private tempat;

  private elementRef;
  private count;

  private query = '';
  private query2 = '';
  private filteredList = [];
  private filteredList2 = [];
  private dosen = [];

  private creds;
  private status;
  private message;

  test;

  //STATUS
  private statusProfile = 0;
  private statusSeminar = 0;


  constructor(private http: Http, private myElement: ElementRef, private authHttp: AuthHttp, private service: MahasiswaService,
  private toastr: ToastsManager) {

    this.nim = this.service.nim;
    this.nama = this.service.nama;

  }

  ngOnInit(){
    this.getConnection();
    this.getStatus();

  }

  private noConn = 0;
  private statusConn = 0;
  getConnection() {
    this.noConn = 0;

    this.authHttp.get(this.service.urlTest)
      .map(res => res.json())
      .subscribe(data => {
        this.statusConn = data['status'];
        // console.log(this.status);
      })

    setTimeout(() => {
      if (!this.statusConn) {
        this.statusConn = 0;
        this.noConn = 1;
        this.showNoConn();
      }
    }, 5000)
  }

  refresh() {
    this.getConnection();
    this.getStatus();

  }

  // DASHBOARD SERVICE
  getStatus() {
    this.authHttp.get(this.service.urlStatus)
      .map(res => res.json())
      .subscribe( data => {
        this.statusProfile = data[0]['statusProfile'];
        this.statusSeminar = data[0]['statusSeminar'];

        if(this.statusSeminar) {
          this.getDataMahasiswa();
        }
        // console.log(this.statusProfile);
      })
  }

  showNoConn() {
    this.toastr.warning("No Internet Connection", 'Error');
  }

  getDataMahasiswa(){
    this.authHttp.get('http://simak.apps.cs.ipb.ac.id:2016/ta/')
      .map(res => res.json())
      .subscribe(data => {
        this.topik = data[0]['topik'];
        this.lab = data[0]['lab'];
        this.dosen_1 = data[0]['dosen1'];
        this.dosen_2 = data[0]['dosen2'];
      })
  }

  onSubmit(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.creds = JSON.stringify({nim: this.nim, topik: this.topik, tanggal: this.tanggal, jam: this.jam, tempat: this.tempat, penguji_ketua: this.query, penguji_anggota: this.query2});

    // this.http.post("http://210.16.120.17:8000/ta/sidang", this.creds, {headers: headers})
    //   .map(res => res.json())
    //   .subscribe(data => {
    //     this.status = data[0].status;
    //     this.message = data[0].message;
    //   }
    // )
  }


}
