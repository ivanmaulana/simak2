import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle} from '@angular/common';
import {AlertComponent, PROGRESSBAR_DIRECTIVES} from 'ng2-bootstrap';
import {FILE_UPLOAD_DIRECTIVES, FileUploader} from 'ng2-file-upload';
import {MahasiswaService} from '../service';
import {AuthHttp, JwtHelper, tokenNotExpired} from 'angular2-jwt';
import {BaCard} from '../../theme/components';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';

// const URL = '/api/';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'skl',
  providers: [MahasiswaService, ToastsManager],
  directives: [BaCard, AlertComponent, FILE_UPLOAD_DIRECTIVES, NgClass, NgStyle, CORE_DIRECTIVES, FORM_DIRECTIVES, PROGRESSBAR_DIRECTIVES],
  styles: [require('./skl.scss')],
  template: require('./skl.html'),
})

export class Skl implements OnInit {
  public max: number = 100;
  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  private noConn = 0;
  private statusConn = 0;

  private statusProfile = 0;
  private statusSidang = 0;

  // DATA MAHASISWA
  private nim;
  private nama;
  private lab;
  private topik;
  private dosen_1;
  private dosen_2;

  ngOnInit() {
    this.getConnection();
    this.getStatus();


  }

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
        this.statusSidang = data[0]['statusSidang'];

        if(this.statusSidang) {
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

  constructor(private authHttp: AuthHttp, private toastr: ToastsManager, private service: MahasiswaService) {

    this.nim = this.service.nim;
    this.nama = this.service.nama;

  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

}
