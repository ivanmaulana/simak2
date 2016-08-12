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
  private LastId;
  private nama;
  private dosen_1;
  private dosen_2;
  private timestamp;

  private response;
  private click: boolean = false;

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
        this.dosen_1 = data[0]['dosen1'];
        this.dosen_2 = data[0]['dosen2'];
      })
  }

  tulis(){
    this.click = !this.click;
  }

  changeTimeStamp(value){
    return value.substr(5,2);
  }

  getDataLog(){
    this.http.get('http://210.16.120.17:8000/log/'+this.nim)
      .map(res => res.json())
      .subscribe(data => {
        this.LastId = data[0]['id'];
        console.log(data[1]['timestamp']);
        this.response = data;
        this.timestamp = this.changeTimeStamp(data[0]['timestamp']);

      })
  }

}
