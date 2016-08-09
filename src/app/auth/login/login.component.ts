import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators, AbstractControl} from '@angular/common';
import {Http, Headers} from '@angular/http';

import {BaCard} from '../../theme/components';
import {BaAppPicturePipe} from '../../theme/pipes';

import {Router} from '@angular/router-deprecated';

@Component({
  selector: 'login',
  pipes: [BaAppPicturePipe],
  directives: [BaCard],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./login.scss')],
  template: require('./login.html')
})

export class Login implements OnInit {
  private username;
  private password;
  private status;
  private message;
  private creds;
  private test;

  ngOnInit(){
    this.status = localStorage.getItem('status');

    if(this.status === 'ce28eed1511f631af6b2a7bb0a85d636'){
      this.route.navigate(['Admin']);
    }
    else if(this.status === '5787be38ee03a9ae5360f54d9026465f'){
      this.route.navigate(['Pages']);
    }
    else {
      this.route.navigate(['Login']);
    }
  }

  peopleTableData:Array<any>;

  constructor(private route: Router, private http: Http) {

  }

  pindah(){
    this.route.navigate(['Pages']);
  }

  submit(){
    this.creds = JSON.stringify({username: this.username, password: this.password});

    this.http.post("http://greentransport.ipb.ac.id/api/similkom", this.creds)
      .map(res => res.json())
      .subscribe(data => {

        localStorage.setItem('id', data['id']);
        localStorage.setItem('username', data['username']);
        localStorage.setItem('nim', data['nim']);
        localStorage.setItem('nip', data['nip']);
        localStorage.setItem('nama', data['nama']);
        localStorage.setItem('email', data['email']);
        localStorage.setItem('angkatan', data['angkatan']);
        localStorage.setItem('status', data['status']);
        localStorage.setItem('token', data['token']);

        this.checkStatus();
      }
    )
  }

  checkStatus(){
    this.test = localStorage.getItem('status');

    if (this.test === '5787be38ee03a9ae5360f54d9026465f'){
      this.route.navigate(['Pages']);
    }
    else if (this.test === 'ce28eed1511f631af6b2a7bb0a85d636'){
      this.route.navigate(['Admin']);
    }
  }

}
