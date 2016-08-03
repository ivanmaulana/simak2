import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {Http, Headers} from '@angular/http';

import {BaCard} from '../../theme/components';
import {BaAppPicturePipe} from '../../theme/pipes';

@Component({
  selector: 'taAdmin',
  pipes: [BaAppPicturePipe],
  directives: [BaCard],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./taAdmin.scss')],
  template: require('./taAdmin.html')
})
export class TaAdmin implements OnInit {

  private profile: boolean = false;
  private nim: string = "";
  private nama: string = "";
  private ipk: string = "";
  private topik: string = "";
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
  private input: string;
  private creds: string;
  private response: string;
  private status: boolean;
  private message: string;


  ngOnInit(){
    this.http.get('http://localhost:8000/ta/daftar')
      .map(res => res.json())
      .subscribe(data => {
        this.response = data;
      })

      this.http.get('http://localhost:8000/ta/daftar/'+this.input)
        .map(res => res.json())
        .subscribe(data => {
          this.nim = data[0].nim;
          this.nama = data[0].nama;
          this.ipk = data[0].ipk;
          this.topik = data[0].topik;
          this.lab = data[0].lab;
          this.dosen_1 = data[0].dosen_1;
          this.dosen_2 = data[0].dosen_2;
          this.konsultasi_1 = data[0].konsultasi_1;
          this.konsultasi_2 = data[0].konsultasi_2;
          this.pertemuan_1 = data[0].pertemuan_1;
          this.pertemuan_2 = data[0].pertemuan_2;
          this.progress_1 = data[0].progress_1;
          this.progress_2 = data[0].progress_2;
          this.progress_3 = data[0].progress_3;
          this.progress_4 = data[0].progress_4;
          console.log(data);
        })
  }

  peopleTableData:Array<any>;

  constructor(private http: Http) {

  }

  openProfile(input){
    this.http.get('http://localhost:8000/ta/daftar/'+input)
      .map(res => res.json())
      .subscribe(data => {
        this.nim = data[0].nim;
        this.nama = data[0].nama;
        this.ipk = data[0].ipk;
        this.topik = data[0].topik;
        this.lab = data[0].lab;
        this.dosen_1 = data[0].dosen_1;
        this.dosen_2 = data[0].dosen_2;
        this.konsultasi_1 = data[0].konsultasi_1;
        this.konsultasi_2 = data[0].konsultasi_2;
        this.pertemuan_1 = data[0].pertemuan_1;
        this.pertemuan_2 = data[0].pertemuan_2;
        this.progress_1 = data[0].progress_1;
        this.progress_2 = data[0].progress_2;
        this.progress_3 = data[0].progress_3;
        this.progress_4 = data[0].progress_4;
        console.log(data);
      })
  }

  simpan(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.creds = JSON.stringify({nim: this.nim, topik: this.topik, lab: this.lab, dosen_1: this.dosen_1, dosen_2: this.dosen_2, konsultasi_1: this.konsultasi_1, konsultasi_2: this.konsultasi_2,
    pertemuan_1: this.pertemuan_1, pertemuan_2: this.pertemuan_2, progress_1: this.progress_1, progress_2: this.progress_2, progress_3: this.progress_3, progress_4: this.progress_4});

    this.http.post("http://localhost:8000/ta/daftar", this.creds, {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        this.status = data[0].status;
        this.message = data[0].message;
      }
    )
  }

}