import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle} from '@angular/common';
import {AlertComponent, PROGRESSBAR_DIRECTIVES} from 'ng2-bootstrap';
import {FILE_UPLOAD_DIRECTIVES, FileUploader} from 'ng2-file-upload';
import {Http, Headers} from '@angular/http';
import {MahasiswaService} from '../service';
import {AuthHttp, JwtHelper, tokenNotExpired} from 'angular2-jwt';

import {BaCard} from '../../theme/components';

// const URL = '/api/';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'kolokium',
  pipes: [],
  providers: [MahasiswaService],
  directives: [BaCard, AlertComponent, FILE_UPLOAD_DIRECTIVES, NgClass, NgStyle, CORE_DIRECTIVES, FORM_DIRECTIVES, PROGRESSBAR_DIRECTIVES],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./kolokium.scss')],
  template: require('./kolokium.html')
})

export class Kolokium implements OnInit {
  private topik;
  private dosen_1;
  private dosen_2;
  private nim;
  private nama;
  private lab;

  private active;
  private jadwal;
  private deadline;
  private test;

  private creds;
  private status;
  private message;
  private response: boolean = false;

  max : number = 100;

  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  ngOnInit(){
    this.getDataMahasiswa();
    this.getDataKolokium();
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  constructor(private http: Http, private data: MahasiswaService, private authHttp: AuthHttp) {
    this.nim = this.data.nim;
    this.nama = this.data.nama;
    this.topik = this.data.topik;
    this.dosen_1 = this.data.dosen_1;
    this.dosen_2 = this.data.dosen_2;


    this.getDataMahasiswa();
    this.getDataKolokium();
  }

  getDataMahasiswa(){
    this.authHttp.get('http://210.16.120.17:8100/ta/')
      .map(res => res.json())
      .subscribe(data => {
        this.topik = data[0]['topik'];
        this.lab = data[0]['lab'];
        this.dosen_1 = data[0]['dosen1'];
        this.dosen_2 = data[0]['dosen2'];
      })
  }

  getDataKolokium(){
    this.http.get('http://210.16.120.17:8000/jadwalKolokium')
      .map(res => res.json())
      .subscribe(data => {
        this.active = data[0]['active'];
        this.jadwal = data[0]['jadwal_kolokium'];
        this.deadline = data[0]['deadline'];

        if (this.jadwal) this.response = true;
      })
  }

  simpan(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.creds = JSON.stringify({nim: this.nim, topik: this.topik});

    this.http.put("http://210.16.120.17:8000/ta/update/", this.creds, {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        this.status = data[0].status;
        this.message = data[0].message;
      }
    )
  }

}
