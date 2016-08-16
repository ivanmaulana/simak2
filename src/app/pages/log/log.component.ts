import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {MahasiswaService} from '../service';

import {BaCard} from '../../theme/components';
import {Http, Headers} from '@angular/http';

@Component({
  selector: 'log',
  pipes: [],
  directives: [BaCard],
  providers: [MahasiswaService],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./log.scss')],
  template: require('./log.html')
})
export class Log implements OnInit{
  private nim;
  private nama;
  private dosen_1;
  private dosen_2;
  private timestamp;
  private topik;

  private response;
  private click: boolean = false;


  // DETAIL
  private resDetail;
  private resJawaban;
  private res;

  private id;
  private creds;
  private balasan;

  // RESPONSE
  private status;
  private message;

  ngOnInit(){
    this.getDataMahasiswa();
    this.getDataLog();
  }

  constructor(private http: Http, private data: MahasiswaService) {
    // this.timestamp = new Date();
    this.nim = this.data.nim;
    this.nama = this.data.nama;

    this.getDataMahasiswa();
    this.getDataLog();
  }

  getDataMahasiswa(){
    this.http.get('http://210.16.120.17:8000/ta/'+this.nim)
      .map(res => res.json())
      .subscribe(data => {
        this.topik = data[0]['topik'];
        this.dosen_1 = data[0]['dosen1'];
        this.dosen_2 = data[0]['dosen2'];
      })
  }

  tulis(){
    this.click = !this.click;
  }

  changeTimeStamp(value){
    return value.substr(0,10);
  }

  getDataLog(){
    this.http.get('http://210.16.120.17:8000/log/'+this.nim)
      .map(res => res.json())
      .subscribe(data => {
        this.response = data;
        this.timestamp = this.changeTimeStamp(data[0]['timestamp']);
      })
  }

  getLogCount(id){
    return this.http.get('http://210.16.120.17/log/count/'+id)
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
      })
  }

  openBimbingan(id){
    this.id = id;

    this.http.get('http://210.16.120.17:8000/log/detail/'+id)
      .map(res => res.json())
      .subscribe(data => {
        this.resDetail = data;
        if (this.resDetail) this.res = 1;
      })

    this.http.get('http://210.16.120.17:8000/log/jawaban/'+id)
      .map(res => res.json())
      .subscribe(data => {
        this.resJawaban = data;
      })
  }

  balas(id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.creds = JSON.stringify({topikId: id, nim: this.nim, jawaban: this.balasan});

    this.http.post("http://210.16.120.17:8000/log/balas/mahasiswa/", this.creds, {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        this.status = data['status'];
        this.message = data['message'];

        this.openBimbingan(id);
      }
    )

    this.balasan = "";
  }

}
