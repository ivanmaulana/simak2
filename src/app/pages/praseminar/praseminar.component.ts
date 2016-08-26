import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle} from '@angular/common';
import {AlertComponent, PROGRESSBAR_DIRECTIVES} from 'ng2-bootstrap';
import {FILE_UPLOAD_DIRECTIVES, FileUploader} from 'ng2-file-upload';
import {MahasiswaService} from '../service';
import {AuthHttp, JwtHelper, tokenNotExpired} from 'angular2-jwt';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';

import {BaCard} from '../../theme/components';

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'praseminar',
  providers: [MahasiswaService, ToastsManager],
  directives: [BaCard, AlertComponent, FILE_UPLOAD_DIRECTIVES, NgClass, NgStyle, CORE_DIRECTIVES, FORM_DIRECTIVES, PROGRESSBAR_DIRECTIVES],
  styles: [require('./praseminar.scss')],
  template: require('./praseminar.html'),
})
export class Praseminar implements OnInit {
  private topik;
  private dosen_1;
  private dosen_2;
  private nim;
  private nama;
  private lab;

  private active;
  private jadwal;
  private deadline;

  private creds;
  private status;
  private message;
  private response: boolean = false;

  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  max : number = 100;

  constructor(private data: MahasiswaService, private toastr: ToastsManager, private authHttp: AuthHttp) {

    this.nim = this.data.nim;
    this.nama = this.data.nama;
    this.dosen_1 = this.data.dosen_1;
    this.dosen_2 = this.data.dosen_2;

    this.getDataPraseminar();
    this.getDataMahasiswa();
  }

  ngOnInit(){
    this.getDataMahasiswa();
    this.getDataPraseminar();
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

  getDataPraseminar(){
    this.authHttp.get('http://210.16.120.17:8100/jadwalPraseminar')
      .map(res => res.json())
      .subscribe(data => {
        this.active = data[0]['active'];
        this.jadwal = data[0]['jadwal_seminar'];
        this.deadline = data[0]['deadline'];

        if (this.jadwal) this.response = true;
      })
  }

  simpan(){
    this.creds = JSON.stringify({topik: this.topik});

    this.authHttp.put("http://210.16.120.17:8100/ta/update/", this.creds)
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

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

}
