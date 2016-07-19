import {Component, ViewEncapsulation} from '@angular/core';
import {RouteConfig} from '@angular/router-deprecated';

import {BaCard} from '../../theme/components';

import {Seminar} from './components/seminar';
import {Kolokium} from './components/kolokium';

@Component({
  selector: 'seminar-kolokium',
  pipes: [],
  directives: [BaCard],
  encapsulation: ViewEncapsulation.None,
  template: `<router-outlet></router-outlet>`
})

@RouteConfig([
  {
    name: 'Seminar',
    component: Seminar,
    path: '/seminar',
    useAsDefault: true
  },
  {
    name: 'Kolokium',
    component: Kolokium,
    path: '/kolokium',
  }
])

export class SK {
  constructor() {
  }

}
