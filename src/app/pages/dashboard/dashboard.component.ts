import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {Http, Response, HTTP_PROVIDERS, Headers} from '@angular/http';

import {BaCard} from '../../theme/components';

import {MahasiswaService} from '../service';

import {Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

@Component({
  selector: 'dashboard',
  pipes: [],
  providers: [MahasiswaService, HTTP_PROVIDERS],
  directives: [BaCard, ROUTER_DIRECTIVES],
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

  ngOnInit(){

  }

  constructor(private http: Http, private router: Router, private data: MahasiswaService) {

  }


  onSubmit(){

  }

  pindah(){

  }

}
