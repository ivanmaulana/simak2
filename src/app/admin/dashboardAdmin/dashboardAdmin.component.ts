import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {AlertComponent} from 'ng2-bootstrap';
import {BaCard} from '../../theme/components';
import {Http, Headers} from '@angular/http';

import {Router} from '@angular/router-deprecated';


@Component({
  selector: 'dashboardAdmin',
  pipes: [],
  directives: [BaCard, AlertComponent],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./dashboardAdmin.scss')],
  template: require('./dashboardAdmin.html')
})

export class DashboardAdmin implements OnInit {
  response;
  status;

  ngOnInit(){

  }

  constructor(private http: Http, private router: Router) {
  }

  pindah(){
    this.router.navigate(['KolokiumAdmin']);
  }

}
