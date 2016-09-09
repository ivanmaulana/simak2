import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators, AbstractControl} from '@angular/common';
import {Http, Headers} from '@angular/http';
import {AuthHttp, JwtHelper, tokenNotExpired} from 'angular2-jwt';

import {ToastsManager} from 'ng2-toastr/ng2-toastr';

import {BaCard} from '../../theme/components';
import {BaAppPicturePipe} from '../../theme/pipes';

import {Router} from '@angular/router-deprecated';


@Component({
  selector: 'login',
  pipes: [BaAppPicturePipe],
  directives: [BaCard],
  providers: [ToastsManager],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./login.scss'),require('./style.css'),require('./responsive.css')],
  template: require('./login.html')
})

export class Login implements OnInit {
  private username;
  private password;
  private status;
  private message;
  private creds;
  private test;
  private role;

  private decode;

  private token;
  private urlLogin = 'http://simak.apps.cs.ipb.ac.id/login/';
  private test2;

  jwtHelper: JwtHelper = new JwtHelper();

  ngOnInit(){
    if (localStorage.getItem('id_token')){
      this.token = localStorage.getItem('id_token');
      this.decode = this.jwtHelper.decodeToken(this.token);
      this.role = this.decode['role'];
      //
      this.checkStatus();
    }
  }

  constructor(private route: Router, private http: Http, private authHttp: AuthHttp, private toastr: ToastsManager) {

  }

  submit(){
    this.creds = JSON.stringify({username: this.username, password: this.password});

    this.http.post(this.urlLogin, this.creds)
      .map(res => res.json())
      .subscribe(data => {
        this.status = data['status'];
        this.message = data['message'];

        // gagal login
        if (!this.status) this.showError();

        // berhasil login
        else {
          this.showSuccess();

          this.token = data['token'];
          localStorage.setItem('id_token', this.token);

          this.decode = this.jwtHelper.decodeToken(this.token);
          this.role = this.decode['role'];

          this.checkStatus();
        }
      }
    )
  }

  showError() {
    this.toastr.error(this.message, 'Error!');
  }

  showSuccess() {
    this.toastr.success("Selamat datang di SIM Ilkom", 'Success !');
  }

  checkStatus(){

    if (this.role === 3){
      this.route.navigate(['Pages']);
    }
    else if (this.role === 2){
      this.route.navigate(['Dosen']);
    }
    else if (this.role === 4){
      this.route.navigate(['Dosen']);
    }
    else if (this.role === 1){
      this.route.navigate(['Admin']);
    }

  }

}
