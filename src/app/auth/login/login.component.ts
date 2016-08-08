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

  }

  peopleTableData:Array<any>;

  constructor(private route: Router, private http: Http) {

  }

  pindah(){
    this.route.navigate(['Pages']);
  }

  submit(){

    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    this.creds = JSON.stringify({username: this.username, password: this.password});

    this.http.post("http://greentransport.ipb.ac.id/api/simak", this.creds)
      .map(res => res.json())
      .subscribe(data => {
        // console.log(data);
        this.status = data['status'];
        localStorage.setItem('status', this.status);

        this.checkStatus();

        console.log(data['status']);
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
