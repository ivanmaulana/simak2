import {Component, ViewEncapsulation, OnInit} from '@angular/core';

import {CORE_DIRECTIVES, NgClass, NgStyle, FORM_DIRECTIVES, } from '@angular/common';
import {TAB_DIRECTIVES, AlertComponent, PROGRESSBAR_DIRECTIVES} from 'ng2-bootstrap';
import {FILE_UPLOAD_DIRECTIVES, FileUploader} from 'ng2-file-upload';
import {Http, Headers} from '@angular/http';
import {AuthHttp, JwtHelper, tokenNotExpired} from 'angular2-jwt';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {MahasiswaService} from '../service';

import {BaCard} from '../../theme/components';

// const URL = '/api/';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'seminar',
  encapsulation: ViewEncapsulation.None,
  providers: [MahasiswaService, ToastsManager],
  directives: [BaCard, AlertComponent, TAB_DIRECTIVES, CORE_DIRECTIVES, FILE_UPLOAD_DIRECTIVES, NgClass, NgStyle, PROGRESSBAR_DIRECTIVES, FORM_DIRECTIVES],
  styles: [require('./seminar.scss')],
  template: require('./seminar.html'),
})
export class Seminar implements OnInit {
  private tab1;
  private tab2;


  private topik;
  private dosen_1;
  private dosen_2;
  private nim;
  private nama;
  private lab;

  // STATUS
  private statusProfile = 0;
  private statusPraseminar = 0;


  public content: string;
  public date: string;
  public seminarBersama: string;
  max : number = 100;
  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  ngOnInit(){
    this.getConnection();
    this.getStatus();
    if (this.statusPraseminar) {
      this.getDataMahasiswa();
      // this.getDataPraseminar();
    }
  }

  private noConn = 0;
  private statusConn = 0;
  getConnection() {
    this.noConn = 0;

    this.authHttp.get(this.data.urlTest)
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
    if (this.statusPraseminar) {
      this.getDataMahasiswa();
      // this.getDataPraseminar();
    }
  }

  // DASHBOARD SERVICE
  getStatus() {
    this.authHttp.get(this.data.urlStatus)
      .map(res => res.json())
      .subscribe( data => {
        this.statusProfile = data[0]['statusProfile'];
        this.statusPraseminar = data[0]['statusPraseminar'];
        // console.log(this.statusProfile);
      })
  }

  showNoConn() {
    this.toastr.warning("No Internet Connection", 'Error');
  }

  constructor(private data: MahasiswaService, private http: Http, private authHttp: AuthHttp, private toastr: ToastsManager) {
    this.nim = this.data.nim;
    this.nama = this.data.nama;

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

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

}
