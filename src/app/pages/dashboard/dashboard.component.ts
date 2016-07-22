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

  constructor(private dashService: DashboardService) {
    this.name="angular2";

    this.dashService.getResponse()
      .subscribe(data => {
        console.log(data);
        this.response = data;

      });
  }

  ngOnInit(){

  }

}
