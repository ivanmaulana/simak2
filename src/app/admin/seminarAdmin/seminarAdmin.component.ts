import {Component} from '@angular/core';
import {RouteConfig} from '@angular/router-deprecated';

import {KonferensiAdmin} from './components/konferensiAdmin';
import {MiconAdmin} from './components/miconAdmin';
import {MandiriAdmin} from './components/mandiriAdmin';

@Component({
  selector: 'seminar',
  pipes: [],
  providers: [],
  styles: [],
  template: `<router-outlet></router-outlet>`
})
@RouteConfig([
  {
    name: 'KonferensiAdmin',
    component: KonferensiAdmin,
    path: '/konferensi',
    useAsDefault: true
  },
  {
    name: 'MiconAdmin',
    component: MiconAdmin,
    path: '/micon'
  },
  {
    name: 'MandiriAdmin',
    component: MandiriAdmin,
    path: '/mandiri'
  },
])

export class SeminarAdmin {

  constructor() {
  }
}
