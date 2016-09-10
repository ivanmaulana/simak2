import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {Http, Response, HTTP_PROVIDERS, Headers} from '@angular/http';
import {AlertComponent} from 'ng2-bootstrap';
import {AuthHttp, JwtHelper, tokenNotExpired} from 'angular2-jwt';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {BaCard} from '../../theme/components';

import {MahasiswaService} from '../service';

import {Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

@Component({
  selector: 'dashboard',
  pipes: [],
  providers: [MahasiswaService, HTTP_PROVIDERS, ToastsManager],
  directives: [AlertComponent, BaCard, ROUTER_DIRECTIVES],
  styles: [require('./dashboard.scss')],
  template: require('./dashboard.html')
})
export class Dashboard implements OnInit{
  name;
  response;
  creds;
  kirim;
  message;
  status;

  noConn = 0;

  nama_ayah;
  statusProfile;

  ngOnInit(){
    this.getConnection();
    this.getStatus();
  }

  getConnection() {
    this.noConn = 0;

    this.authHttp.get(this.data.urlTest)
      .map(res => res.json())
      .subscribe(data => {
        this.status = data['status'];
        // console.log(this.status);
      })

    setTimeout(() => {
      if (!this.status) {
        this.status = 0;
        this.noConn = 1;
        this.showNoConn();
      }
    }, 5000)
  }

  refresh() {
    this.getConnection();
    this.getStatus();
  }

  constructor(private http: Http, private router: Router, public data: MahasiswaService, private authHttp: AuthHttp,
  private toastr: ToastsManager) {

  }

  showWarning() {
    this.toastr.warning("Sedang Mengunduh Data", 'Loading');
  }

  showNoConn() {
    this.toastr.warning("No Internet Connection", 'Error');
  }

  onSubmit(){

  }

  pindah(){

  }


  // DASHBOARD SERVICE
  getStatus() {
    this.authHttp.get(this.data.urlStatus)
      .map(res => res.json())
      .subscribe( data => {
        this.statusProfile = data[0]['statusProfile'];
        // console.log(this.statusProfile);
      })
  }


}
