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


  constructor(private http: Http, private myElement: ElementRef, private authHttp: AuthHttp, private service: MahasiswaService,
  private toastr: ToastsManager) {
    this.elementRef = myElement;
    this.getDataMahasiswa();
    this.getDataDosen();
    this.getDataSidang();
  }

  ngOnInit(){
    this.getDataMahasiswa();
    this.getDataSidang();
  }

  getDataMahasiswa(){
    this.http.get('http://210.16.120.17:8000/ta/g64130076')
      .map(res => res.json())
      .subscribe(data => {
        this.nim = data[0].nim;
        this.nama = data[0].nama;
        this.topik = data[0].topik;
        this.dosen_1 = data[0].dosen1;
        this.dosen_2 = data[0].dosen2;
      })
  }

  getDataSidang(){
    this.http.get('http://210.16.120.17:8000/ta/sidang/g64130076')
      .map(res => res.json())
      .subscribe(data => {
        this.nim = data[0].nim;
        this.nama = data[0].nama;
        this.tanggal = data[0].tanggal;
        this.jam = data[0].jam;
        this.tempat = data[0].tempat;
        this.query = data[0].penguji_ketua;
        this.query2 = data[0].penguji_anggota;
      })
  }


  filter() {
    if (this.query !== "" && this.query.length > 2){
        this.filteredList = this.dosen.filter(function(el){
            return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
        }.bind(this));
    }else{
        this.filteredList = [];
    }
  }

  select(item){
      this.query = item;
      this.filteredList = [];
  }

  reset(){
    this.query = "";
  }

  filter2() {
    if (this.query2 !== "" && this.query2.length > 2){
        this.filteredList2 = this.dosen.filter(function(el){
            return el.toLowerCase().indexOf(this.query2.toLowerCase()) > -1;
        }.bind(this));
    }else{
        this.filteredList2 = [];
    }
  }

  select2(item){
      this.query2 = item;
      this.filteredList2 = [];
  }

  reset2(){
    this.query2 = "";
  }

  getDataDosen(){
    this.http.get('http://210.16.120.17:8000/dosen')
      .map(res => res.json())
        .subscribe( data => {
          this.count = data[0]['id'];
          for (var i = 0; i < this.count; i++){
            this.dosen.push(data[i]['nama']);
          }
        })
  }

  handleClick(event){
   var clickedComponent = event.target;
   var inside = false;
   do {
       if (clickedComponent === this.elementRef.nativeElement) {
           inside = true;
       }
      clickedComponent = clickedComponent.parentNode;
   } while (clickedComponent);
    if(!inside){
        this.filteredList = [];
    }
  }

  onSubmit(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.creds = JSON.stringify({nim: this.nim, topik: this.topik, tanggal: this.tanggal, jam: this.jam, tempat: this.tempat, penguji_ketua: this.query, penguji_anggota: this.query2});

    this.http.post("http://210.16.120.17:8000/ta/sidang", this.creds, {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        this.status = data[0].status;
        this.message = data[0].message;
      }
    )
  }


}
