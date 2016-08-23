import {Component, ViewEncapsulation, ElementRef, OnInit} from '@angular/core';
import {BaCard} from '../../theme/components';
import {Http, Response, HTTP_PROVIDERS, Headers} from '@angular/http';
import {AuthHttp, JwtHelper, tokenNotExpired} from 'angular2-jwt';

import {MahasiswaService} from '../service';
import {PengajuanService} from './pengajuan.service';

@Component({
  selector: 'pengajuan',
  host: {'(document:click)': 'handleClick($event)',},
  directives: [BaCard],
  providers: [MahasiswaService, PengajuanService, HTTP_PROVIDERS],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./pengajuan.scss')],
  template: require('./pengajuan.html')
})

export class Pengajuan implements OnInit{
  private nim: string;
  private nama: string;
  private topik: string;
  private lab: number = 0;
  private dosen_1: string = "";
  private dosen_2: string = "";
  private konsultasi_1: boolean = false;
  private konsultasi_2: boolean = false;
  private pertemuan_1: number = 0;
  private pertemuan_2: number = 0;
  private progress_1: boolean = false;
  private progress_2: boolean = false;
  private progress_3: boolean = false;
  private progress_4: boolean = false;
  private creds: string = "";
  private status;
  private message;
  private dosen = [];
  private count;

  private c: boolean = true;
  private c2: boolean = true;
  private response;
  private test;

  private disableCheckbox: boolean = true;

  ngOnInit(){
    this.getDataPengajuan();
  }

  public query = '';
  public query2 = '';
  public filteredList = [];
  public filteredList2 = [];
  public elementRef;

  constructor(private http: Http, private authHttp: AuthHttp, private pengajuanService: PengajuanService, private service: MahasiswaService, private myElement: ElementRef) {
    this.getDataDosen();
    this.elementRef = myElement;

    this.nim = this.service.nim;
    this.nama = this.service.nama;
    this.getDataPengajuan();

    this.test = this.service.getSend();
  }

  set(){
    this.test = this.service.setSend('ini ivan');
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
      this.c = !this.c;

      this.dosen_1 = this.getIdDosen(this.query);
  }

  reset(){
    this.c = true;
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
      this.c2 = !this.c2;

      this.dosen_2 = this.getIdDosen(this.query2);
  }


  reset2(){
    this.c2 = true;
    this.query2 = "";
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

  getDataDosen(){
    this.authHttp.get(this.service.urlDosen)
      .map(res => res.json())
        .subscribe( data => {
          this.count = data[0]['id'];
          this.response = data;
          console.log(this.response);
          for (var i = 0; i < this.count; i++){
            this.dosen.push(data[i]['nama']);
          }
        })


  }

  getIdDosen(nama){
    let id;
    console.log("nama :"+nama);
    for (var i = 0; i < this.response.length; i++){
      if (nama === this.response[i]['nama']) {
        id =  this.response[i]['id'];
        console.log(id+" : "+nama);
      }
    }
    return id;
  }

  getDataPengajuan(){
    this.authHttp.get(this.service.urlDataPengajuan+this.nim)
      .map(res => res.json())
        .subscribe( data => {
          this.count = data[0]['id'];
          this.nim = data[0]['nim'];
          this.topik = data[0]['topik'];
          this.lab = data[0]['lab'];
          this.dosen_1 = data[0]['dosen_1'];
          this.konsultasi_1 = data[0]['konsultasi_1'];
          this.pertemuan_1 = data[0]['pertemuan_1'];
          this.dosen_2 = data[0]['dosen_2'];
          this.konsultasi_2 = data[0]['konsultasi_2'];
          this.pertemuan_2 = data[0]['pertemuan_2'];

          this.progress_1 = data[0]['progress_1'];
          this.progress_2 = data[0]['progress_2'];
          this.progress_3 = data[0]['progress_3'];
          this.progress_4 = data[0]['progress_4'];
          this.query = data[0]['dosen1'];
          this.query2 = data[0]['dosen2'];
          if (this.query) this.c = false;
          if (this.query2) this.c2 = false;

        })
  }

  onSubmit(){
    this.creds = JSON.stringify({nim: this.nim, topik: this.topik, lab: this.lab, dosen_1: this.dosen_1, dosen_2: this.dosen_2, konsultasi_1: this.konsultasi_1, konsultasi_2: this.konsultasi_2,
    pertemuan_1: this.pertemuan_1, pertemuan_2: this.pertemuan_2, progress_1: this.progress_1, progress_2: this.progress_2, progress_3: this.progress_3, progress_4: this.progress_4});

    this.authHttp.post(this.service.urlDaftarPengajuan, this.creds)
      .map(res => res.json())
      .subscribe(data => {
        // console.log(data);
        this.status = data[0].status;
        this.message = data[0].message;
      }
    )
  }

  radioLab(input){
    this.lab = input;
  }

  radio1(input){
    this.konsultasi_1 = input;
    this.pertemuan_1 = 0;
  }

  radio2(input){
    this.konsultasi_2 = input;
    this.pertemuan_2 = 0;
  }

  checkbox(input){
    if (input == 1){
      this.progress_1 = !this.progress_1;
      this.progress_2 = false;
      this.progress_3 = false;
      this.progress_4 = false;

      this.disableCheckbox = !this.disableCheckbox;
    }

    if (input == 2){
      this.progress_2 = !this.progress_2;
      this.progress_1 = false;
    }

    if (input == 3){
      this.progress_3 = !this.progress_3;
      this.progress_1 = false;
    }

    if (input == 4){
      this.progress_4 = !this.progress_4;
      this.progress_1 = false;
    }
  }

}
