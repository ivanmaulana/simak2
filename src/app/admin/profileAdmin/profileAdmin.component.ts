import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {Http, Headers} from '@angular/http';

import {BaCard} from '../../theme/components';
import {BaAppPicturePipe} from '../../theme/pipes';

@Component({
  selector: 'profileAdmin',
  pipes: [BaAppPicturePipe],
  directives: [BaCard],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./profileAdmin.scss')],
  template: require('./profileAdmin.html')
})
export class ProfileAdmin implements OnInit {

  private profile;
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
    this.http.get('http://localhost:8000/profile/g64130076')
      .map(res => res.json())
      .subscribe(data => {
        this.profile = data;
      })
  }

  peopleTableData:Array<any>;

  constructor(private http: Http) {

  }

  openProfile(input){
    this.http.get('http://localhost:8000/profile/'+input)
      .map(res => res.json())
      .subscribe(data => {
        this.profile = data;
      })
  }

  simpan(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.creds = JSON.stringify({nim: this.nim, topik: this.topik, lab: this.lab, dosen_1: this.dosen_1, dosen_2: this.dosen_2});

    this.http.put("http://localhost:8000/ta/edit/", this.creds, {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        this.status = data[0].status;
        this.message = data[0].message;
      }
    )
  }

}
