import {Component, ViewEncapsulation, OnInit} from '@angular/core';

import {BaCard} from '../../theme/components';
import {Http, Headers} from '@angular/http';

import {Router} from '@angular/router-deprecated';


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
    this.http.get('http://210.16.120.17:8000/ta/daftar')
      .map(res => res.json())
      .subscribe(data => {
        this.response = data;
      })
  }

  constructor(private http: Http, private router: Router) {

  }

  pindah(){
    this.router.navigate(['KolokiumAdmin']);
  }

}
