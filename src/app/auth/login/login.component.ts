import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators, AbstractControl} from '@angular/common';
import {Http, Headers} from '@angular/http';
import {AuthHttp, JwtHelper, tokenNotExpired} from 'angular2-jwt';

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

  jwtHelper: JwtHelper = new JwtHelper();

  ngOnInit(){
    this.status = localStorage.getItem('status');

    if(this.status === 'dosen'){
      this.route.navigate(['Admin']);
    }
    else if(this.status === 'mahasiswa'){
      this.route.navigate(['Pages']);
    }
    else {
      this.route.navigate(['Login']);
    }
  }

  peopleTableData:Array<any>;

  constructor(private route: Router, private http: Http, private authHttp: AuthHttp) {
    localStorage.setItem('id_token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJTSU0gSWxrb20iLCJ1c2VybmFtZSI6Iml2YW5tYXVsYW5hIiwibmltIjoiRzY0MTMwMDc2IiwibmFtYSI6IklWQU4gTUFVTEFOQSBQVVRSQSJ9.Q_2Cgsx29vID0jNSwpOAr2bJJF_vuMeFsoB8dr-oHuk");

    authHttp.get('http://210.16.120.17:8000/dosen')
    .subscribe(
      data => this.test = data,
      err => console.log(err),
      () => console.log(this.test)
    );

  }

  pindah(){
    this.route.navigate(['Pages']);
  }

  submit(){
    // // this.creds = JSON.stringify({username: this.username, password: this.password});
    // var myHeader = new Headers();
    // myHeader.append('Content-Type', 'application/json');
    // //
    // // // this.authHttp.get('http://agricode.cs.ipb.ac.id/ivan/login.php', { headers: myHeader} )
    // // // .subscribe(
    // // //   data => this.test = data,
    // // //   err => console.log(err),
    // // //   () => console.log(this.test)
    // // // );
    // //
    // //
    // //
    // // // Pass it after the body in a POST request
    //
    // this.creds = JSON.stringify({username: this.username, password: this.password});
    // this.http.post('http://sbrc.ipb.ac.id/api/simak.php', this.creds)
    //   .subscribe(
    //     data => this.test = data,
    //     err => console.log(err),
    //     () => console.log(this.test)
    //   );
    //   // this.route.navigate(['Pages']);


    this.creds = JSON.stringify({username: this.username, password: this.password});

    this.http.post("http://agricode.cs.ipb.ac.id/ivan/login.php", this.creds)
      .map(res => res.json())
      .subscribe(data => {
        this.test = data['token'];

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

    if (this.test === 'mahasiswa'){
      this.route.navigate(['Pages']);
    }
    else if (this.test === 'dosen'){
      this.route.navigate(['Admin']);
    }
  }

}
