import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {Http, Response, HTTP_PROVIDERS, Headers} from '@angular/http';

import {PopularApp} from './popularApp';
import {PieChart} from './pieChart';
import {TrafficChart} from './trafficChart';
import {UsersMap} from './usersMap';
import {LineChart} from './lineChart';
import {Feed} from './feed';
import {Todo} from './todo';
import {Calendar} from './calendar';
import {BaCard} from '../../theme/components';

import {DashboardService} from './dashboard.service';

import {MahasiswaService} from '../service';

import {Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

@Component({
  selector: 'dashboard',
  pipes: [],
  providers: [DashboardService, MahasiswaService, HTTP_PROVIDERS],
  directives: [PopularApp, PieChart, TrafficChart, UsersMap, LineChart, Feed, Todo, Calendar, BaCard, ROUTER_DIRECTIVES],
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

  send = 'aaa';


  ngOnInit(){

  }

  constructor(private dashService: DashboardService, private http: Http, private router: Router, private data: MahasiswaService) {
    // this.send = this.data.getTest();

//     this.send = `{
//   "sub": "1234567890",
//   "name": "John Doe",
//   "admin": true
// }`;

  }

  // set(){
  //   this.send = btoa(this.send);
  // }
  //
  // tes(){
  //   this.send = atob(this.send);
  // }
  //
  // sub1(){
  //   let temp;
  //   temp = JSON.parse(this.send);
  //   this.send = temp['sub'];
  // }

  onSubmit(){

  }

  pindah(){

  }

}
