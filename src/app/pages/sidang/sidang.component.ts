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

  constructor(private http: Http, private myElement: ElementRef, private authHttp: AuthHttp, private service: MahasiswaService,
  private toastr: ToastsManager) {
    this.test = 'dwadwad';
    this.tanggal = this.service.tanggal;

    this.test = this.service.topik;

  }

  ngOnInit(){

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
