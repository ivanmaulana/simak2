import {Component, ViewEncapsulation, OnInit} from '@angular/core';

import {BaCard} from '../../theme/components';
import {Http, Headers} from '@angular/http';

import {Router} from '@angular/router-deprecated';


@Component({
  selector: 'logAdmin',
  pipes: [],
  directives: [BaCard],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./logDosen.scss')],
  template: require('./logDosen.html')
})

export class LogDosen implements OnInit {
  private message;
  private status;
  private dosen_id;


  // Data Log
  private id;
  private resLog;

  // Detail Bimbingan
  private resJawaban;
  private resDetail;
  private res;

  // Balas
  private creds;
  private balasan;

  ngOnInit(){
    this.getDataLog();


  }

  constructor(private http: Http, private router: Router) {
    this.getDataLog();
  }

  getDataLog(){
    this.dosen_id = localStorage.getItem('id');

    this.http.get('http://210.16.120.17:8000/log/dosen/'+this.dosen_id)
      .map(res => res.json())
      .subscribe(data => {
        this.resLog = data;
      })
  }

  openBimbingan(logId){
    this.id = logId;

    this.http.get('http://210.16.120.17:8000/log/detail/'+logId)
      .map(res => res.json())
      .subscribe(data => {
        this.resDetail = data;
        if (this.resDetail) this.res = 1;
      })

    this.http.get('http://210.16.120.17:8000/log/jawaban/'+logId)
      .map(res => res.json())
      .subscribe(data => {
        this.resJawaban = data;
      })
  }

  balas(id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.creds = JSON.stringify({topikId: id, dosen_id: this.dosen_id, jawaban: this.balasan});

    this.http.post("http://210.16.120.17:8000/log/balas/dosen/", this.creds, {headers: headers})
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
