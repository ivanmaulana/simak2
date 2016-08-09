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


  ngOnInit(){
    this.dashService.getResponse()
      .subscribe(data => {
        this.response = data;
      });
  }

  constructor(private dashService: DashboardService, private http: Http, private router: Router, private mahasiswaService: MahasiswaService) {
    this.name="angular2";

    this.status = mahasiswaService.send;



  }

  onSubmit(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.creds = JSON.stringify({name : this.name});
    this.http.post("http://210.16.120.17:8000/todo/", this.creds, {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        this.status = data[0].status;
        this.message = data[0].message;
      }
    )

    this.dashService.getResponse()
      .subscribe(data => {
        this.response = data;
      });

    console.log(this.status);
  }

  pindah(){
    this.router.navigate(['Login']);
  }

}
