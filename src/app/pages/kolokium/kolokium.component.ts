import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle} from '@angular/common';
import {AlertComponent, PROGRESSBAR_DIRECTIVES} from 'ng2-bootstrap';
import {FILE_UPLOAD_DIRECTIVES, FileUploader} from 'ng2-file-upload';
import {MahasiswaService} from '../service';
import {AuthHttp, JwtHelper, tokenNotExpired} from 'angular2-jwt';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';

import {BaCard} from '../../theme/components';


@Component({
  selector: 'kolokium',
  pipes: [],
  providers: [MahasiswaService, ToastsManager],
  directives: [BaCard, AlertComponent, FILE_UPLOAD_DIRECTIVES, NgClass, NgStyle, CORE_DIRECTIVES, FORM_DIRECTIVES, PROGRESSBAR_DIRECTIVES],
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

  //STATUS
  private statusProfile = 0;
  private statusTa = 0;

  max : number = 100;

  private token = this.data.token;

  public uploader : FileUploader = new FileUploader({});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  ngOnInit(){
    this.getConnection();
    this.getStatus();

    // && item.type == 'application/pdf'
    this.uploader.setOptions({
      filters: [{ fn: item => {
        return item.size < 1024 * 1024 * 10 && item.type == 'application/pdf'
      }}]
    })

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

  // DASHBOARD SERVICE
  getStatus() {
    this.authHttp.get(this.data.urlStatus)
      .map(res => res.json())
      .subscribe( data => {
        this.statusProfile = data[0]['statusProfile'];
        this.statusTa= data[0]['statusTa'];
        // console.log(this.statusProfile);

        if(this.statusTa) {
          this.getDataMahasiswa();
          this.getDataKolokium();
        }

      })
  }

  refresh() {
    this.getConnection();
    this.getStatus();

  }

  showNoConn() {
    this.toastr.warning("No Internet Connection", 'Error');
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  constructor(private data: MahasiswaService, private authHttp: AuthHttp, private toastr: ToastsManager) {
    this.nim = this.data.nim;
    this.nama = this.data.nama;
    this.topik = this.data.topik;
    this.dosen_1 = this.data.dosen_1;
    this.dosen_2 = this.data.dosen_2;

    this.uploader.setOptions({
      authToken: this.data.token,
      url: 'http://210.16.120.17/upload/kolokium.php',
      withCredentials: true,
      disableMultipart: true,
      headers: [{
        name: 'Authorization',
        value: this.data.token
      }]
    });

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

  getDataKolokium(){
    this.authHttp.get('http://simak.apps.cs.ipb.ac.id:2016/jadwalKolokium')
      .map(res => res.json())
      .subscribe(data => {
        this.active = data[0]['active'];
        this.jadwal = data[0]['jadwal_kolokium'];
        this.deadline = data[0]['deadline'];

        if (this.jadwal) this.response = true;
      })
  }

  simpan(){
    this.creds = JSON.stringify({topik: this.topik});

    this.authHttp.put("http://simak.apps.cs.ipb.ac.id:2016/ta/update/", this.creds)
      .map(res => res.json())
      .subscribe(data => {
        this.status = data[0].status;
        this.message = data[0].message;

        if(this.status) this.showSuccess();
        else this.showError();

      }
    )
  }

  showError() {
    this.toastr.error('Update Topik Gagal', 'Error!');
  }

  showSuccess() {
    this.toastr.success("Update Topik Berhasil", 'Success !');
  }

}
