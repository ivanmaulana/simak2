import {Component, ElementRef, OnInit} from '@angular/core';
import {BaCard} from '../../theme/components';
import {HTTP_PROVIDERS} from '@angular/http';
import {AuthHttp, JwtHelper, tokenNotExpired} from 'angular2-jwt';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {AlertComponent} from 'ng2-bootstrap';

import {MahasiswaService} from '../service';

@Component({
  selector: 'pengajuan',
  host: {'(document:click)': 'handleClick($event)',},
  directives: [BaCard, AlertComponent],
  providers: [MahasiswaService, HTTP_PROVIDERS, ToastsManager],
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

  //status
  private statusProfile;
  private statusDaftar;



  private disableCheckbox: boolean = true;

  ngOnInit(){
    this.getConnection();
    this.getStatus();
    this.getDataPengajuan();
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
    this.getDataPengajuan();
  }

  showNoConn() {
    this.toastr.warning("No Internet Connection", 'Error');
  }


  public query = '';
  public query2 = '';
  public filteredList = [];
  public filteredList2 = [];
  public elementRef;

  constructor(private authHttp: AuthHttp,
    private service: MahasiswaService,
    private myElement: ElementRef,
    private toastr: ToastsManager) {

    this.getDataDosen();
    this.elementRef = myElement;

    this.nim = this.service.nim;
    this.nama = this.service.nama;
    this.getDataPengajuan();

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
    this.dosen_1 = "0";
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
    this.dosen_2 = "0";
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
          // console.log(this.response);
          for (var i = 0; i < this.count; i++){
            this.dosen.push(data[i]['nama']);
          }
        })
  }

  getIdDosen(nama){
    let id;
    // console.log("nama :"+nama);
    for (var i = 0; i < this.response.length; i++){
      if (nama === this.response[i]['nama']) {
        id =  this.response[i]['id'];
        // console.log(id+" : "+nama);
      }
    }
    return id;
  }

  getDataPengajuan(){
    this.authHttp.get('http://simak.apps.cs.ipb.ac.id:2016/ta/daftar/detail/')
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
    let koneksi = 0;

    this.authHttp.get(this.service.urlTest)
      .map(res => res.json())
      .subscribe(data => {
        koneksi = data['status'];

      })

    this.creds = JSON.stringify({nim: this.nim, topik: this.topik, lab: this.lab, dosen_1: this.dosen_1, dosen_2: this.dosen_2, konsultasi_1: this.konsultasi_1, konsultasi_2: this.konsultasi_2,
    pertemuan_1: this.pertemuan_1, pertemuan_2: this.pertemuan_2, progress_1: this.progress_1, progress_2: this.progress_2, progress_3: this.progress_3, progress_4: this.progress_4});

    console.log(this.creds);

    this.authHttp.post(this.service.urlDaftarPengajuan, this.creds)
      .map(res => res.json())
      .subscribe(data => {
        // console.log(data);
        this.status = data[0].status;
        this.message = data[0].message;

        if (this.status) this.showSuccess();
        else this.showError();
      }
    )

    setTimeout(() => {
      if (!koneksi) {
        this.showNoConn();
      }
    }, 2000)
  }

  // DASHBOARD SERVICE
  getStatus() {
    this.authHttp.get(this.service.urlStatus)
      .map(res => res.json())
      .subscribe( data => {
        this.statusProfile = data[0]['statusProfile'];
        this.statusDaftar = data[0]['statusDaftar'];
        // console.log(this.statusProfile);
      })
  }


  showError() {
    this.toastr.error('Pengajuan Topik Gagal', 'Error!');
  }

  showSuccess() {
    this.toastr.success("Pengajuan Topik Berhasil", 'Success !');
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
