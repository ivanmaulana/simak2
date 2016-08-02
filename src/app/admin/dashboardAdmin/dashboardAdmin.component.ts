import {Component, ViewEncapsulation, OnInit} from '@angular/core';

import {BaCard} from '../../theme/components';
import {Http, Headers} from '@angular/http';


@Component({
  selector: 'dashboardAdmin',
  pipes: [],
  directives: [BaCard],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./dashboardAdmin.scss')],
  template: require('./dashboardAdmin.html')
})

export class DashboardAdmin implements OnInit {
  response;

  ngOnInit(){
    this.http.get('http://localhost:8000/ta/daftar')
      .map(res => res.json())
      .subscribe(data => {
        this.response = data;
      })
  }

  constructor(private http: Http) {

  }

}
