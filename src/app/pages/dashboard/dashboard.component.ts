import {Component, ViewEncapsulation} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {Http, Response, HTTP_PROVIDERS} from '@angular/http';

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

@Component({
  selector: 'dashboard',
  pipes: [],
  providers: [DashboardService, HTTP_PROVIDERS],
  directives: [PopularApp, PieChart, TrafficChart, UsersMap, LineChart, Feed, Todo, Calendar, BaCard],
  styles: [require('./dashboard.scss')],
  template: require('./dashboard.html')
})
export class Dashboard {
  name;
  response;
  creds;
  kirim;
  message;
  status;

  constructor(private dashService: DashboardService, private http: Http) {
    this.name="angular2";

    this.dashService.getResponse()
      .subscribe(data => {
        this.response = data;
      });
  }

  ngOnInit(){

  }

  onSubmit(){
    // this.creds = JSON.stringify({name : this.name});
    //
    // this.kirim = this.dashService.postInput(this.creds);
    // console.log(this.kirim);

    this.http.post("http://localhost:8000/todo/", this.name)
      .map(res => res.json())
      .subscribe(data => {
        this.status = data[0].status;
        this.message = data[0].message;
      }
    )

    console.log(this.status);
  }

}
