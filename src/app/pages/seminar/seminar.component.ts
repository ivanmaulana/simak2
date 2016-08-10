import {Component, ViewEncapsulation, OnInit} from '@angular/core';

import {CORE_DIRECTIVES, NgClass, NgStyle, FORM_DIRECTIVES, } from '@angular/common';
import {TAB_DIRECTIVES, AlertComponent, PROGRESSBAR_DIRECTIVES} from 'ng2-bootstrap';
import {FILE_UPLOAD_DIRECTIVES, FileUploader} from 'ng2-file-upload';
import {Http, Headers} from '@angular/http';

import {MahasiswaService} from '../service';

import {BaCard} from '../../theme/components';

// const URL = '/api/';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'seminar',
  encapsulation: ViewEncapsulation.None,
  providers: [MahasiswaService],
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

  public content: string;
  public date: string;
  public seminarBersama: string;
  max : number = 100;
  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  ngOnInit(){
    this.getDataMahasiswa();
  }

  constructor(private data: MahasiswaService, private http: Http) {
    this.nim = this.data.nim;
    this.nama = this.data.nama;
    this.dosen_1 = this.data.dosen_1;
    this.dosen_2 = this.data.dosen_2;
    this.topik = this.data.topik;

    this.getDataMahasiswa();
  }

  getDataMahasiswa(){
    this.http.get('http://210.16.120.17:8000/ta/'+this.nim)
      .map(res => res.json())
      .subscribe(data => {
        this.topik = data[0].topik;
        this.lab = data[0].lab;
        this.dosen_1 = data[0].dosen1;
        this.dosen_2 = data[0].dosen2;
      })
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

}
