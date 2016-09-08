import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {Http, Response, HTTP_PROVIDERS, Headers} from '@angular/http';
import {AlertComponent, PROGRESSBAR_DIRECTIVES} from 'ng2-bootstrap';
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

  nama_ayah;

  statusProfile;

  ngOnInit(){

    // this.authHttp.get('http://210.16.120.17:8100/test/')
    //   .map(res => res.json())
    //   .subscribe(data => {
    //     this.status = data;
    //     console.log(this.status);
    //   })
    //
    //   if(!this.status) this.showWarning();

    this.getStatus();

  }

  constructor(private http: Http, private router: Router, public data: MahasiswaService, private authHttp: AuthHttp,
  private toastr: ToastsManager) {

  }

  showWarning() {
    this.toastr.warning("Sedang Mengunduh Data", 'Loading');
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
