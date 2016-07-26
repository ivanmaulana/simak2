import {Component} from '@angular/core';
import {RouteConfig} from '@angular/router-deprecated';

import {Praseminar} from './components/praseminar';
import {Seminar2} from './components/seminar2';

@Component({
  selector: 'seminar',
  pipes: [],
  providers: [],
  styles: [],
  template: `<router-outlet></router-outlet>`
})
@RouteConfig([
  {
    name: 'Praseminar',
    component: Praseminar,
    path: '/praseminar',
    useAsDefault: true
  },
  {
    name: 'Seminar2',
    component: Seminar2,
    path: '/seminar',
  }
])

export class Seminar {

  constructor() {
  }
}
