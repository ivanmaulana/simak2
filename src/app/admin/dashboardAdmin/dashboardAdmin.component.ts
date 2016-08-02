import {Component, ViewEncapsulation} from '@angular/core';

import {BaCard} from '../../theme/components';

@Component({
  selector: 'dashboardAdmin',
  pipes: [],
  directives: [BaCard],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./dashboardAdmin.scss')],
  template: require('./dashboardAdmin.html')
})
export class DashboardAdmin {
  
  constructor() {
  }

}
