import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {MahasiswaService} from '../service';
import {AuthHttp} from 'angular2-jwt';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';

import {BaCard} from '../../theme/components';
import {Http, Headers} from '@angular/http';

@Component({
  selector: 'log',
  pipes: [],
  directives: [BaCard],
  providers: [MahasiswaService, ToastsManager],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./log.scss')],
  template: require('./log.html')
})
export class Log implements OnInit{
  private nim;
  private nama;
  private dosen1;
  private dosen2;
  private timestamp;
  private topik;

  // TULIS LOG
  private topik_log = "ini topik log";
  private dosen_1 = 25;
  private dosen_2 = 24;
  private tempat = "mulmed";
  private jam = "10:30";
  private date = "2016-08-09";
  private progress = "ini progress";
  private kendala = "ini kendala";
  private rencana = "ini rencana";
  private statusKirim;
  private messageKirim;
  private creds2;


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

  constructor(private http: Http, private service: MahasiswaService, private authHttp: AuthHttp, private toastr: ToastsManager) {
    // this.timestamp = new Date();
    this.nim = this.service.nim;
    this.nama = this.service.nama;

    this.getDataMahasiswa();
    this.getDataLog();
  }

  getDataMahasiswa(){
    this.authHttp.get('http://210.16.120.17:8100/ta/')
      .map(res => res.json())
      .subscribe(data => {
        this.topik = data[0]['topik'];
        this.dosen1 = data[0]['dosen1'];
        this.dosen2 = data[0]['dosen2'];
        this.dosen_1 = data[0]['dosen_1'];
        this.dosen_2 = data[0]['dosen_2'];
      })
  }

  kirim(){
    this.creds2 = JSON.stringify({dosen_1: this.dosen_1, dosen_2: this.dosen_2, tanggal: this.date, jam: this.jam, tempat: this.tempat, topik: this.topik_log, progress: this.progress, kendala: this.kendala, rencana: this.rencana});

    this.authHttp.post('http://210.16.120.17:8100/log/', this.creds2)
      .map(res => res.json())
      .subscribe(data => {
        this.statusKirim = data['status'];
        this.messageKirim = data['message'];

        if (this.statusKirim) {
          this.showKirimSuccess();
          this.click = !this.click;
          this.getDataLog();
        }
        else {
          this.showKirimError();
        }
      })
  }

  showKirimError() {
    this.toastr.error('Tulis Log Gagal', 'Error!');
  }

  showKirimSuccess() {
    this.toastr.success("Tulis Log Berhasil", 'Success !');
  }

  tulis(){
    this.click = !this.click;
  }

  changeTimeStamp(value){
    return value.substr(0,10);
  }

  getDataLog(){
    this.authHttp.get('http://210.16.120.17:8100/log/')
      .map(res => res.json())
      .subscribe(data => {
        this.response = data;
      })
  }

  getLogCount(id){
    return this.authHttp.get('http://210.16.120.17:8100/log/count/'+id)
      .map(res => res.json())
      .subscribe(data => {
        // console.log(data);
      })
  }

  openBimbingan(id){
    this.id = id;

    this.authHttp.get('http://210.16.120.17:8100/log/detail/'+id)
      .map(res => res.json())
      .subscribe(data => {
        this.resDetail = data;
        if (this.resDetail) this.res = 1;
      })

    this.authHttp.get('http://210.16.120.17:8100/log/jawaban/'+id)
      .map(res => res.json())
      .subscribe(data => {
        this.resJawaban = data;
      })
  }

  balas(id){
    this.creds = JSON.stringify({topikId: id, nim: this.nim, jawaban: this.balasan});

    this.authHttp.post("http://210.16.120.17:8100/log/balas/mahasiswa/", this.creds)
      .map(res => res.json())
      .subscribe(data => {
        this.status = data['status'];
        this.message = data['message'];

        if (this.status) this.showSuccess();
        else this.showError();

        this.openBimbingan(id);
      }
    )

    this.balasan = "";
  }

  showError() {
    this.toastr.error('Diskusi Gagal', 'Error!');
  }

  showSuccess() {
    this.toastr.success("Jawab Diskusi Berhasil", 'Success !');
  }

}
