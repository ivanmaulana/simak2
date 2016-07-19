import {Component, ViewEncapsulation} from '@angular/core';
import {ChartsService} from './charts.service';

import {BaCard} from '../../theme/components';
import {BaChartistChart} from '../../theme/components';
import {Observable} from 'rxjs/Observable';

import {TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap';

@Component({
  selector: 'chartist-js',
  encapsulation: ViewEncapsulation.None,
  pipes: [],
  providers: [BaCard, BaChartistChart, ChartsService],
  styles: [require('chartist/dist/chartist.css'), require('./charts.scss')],
  template: require('./charts.html')
})
export class Charts {

  constructor(private _chartsService:ChartsService) {
  }

  ngOnInit() {

  }

  getResponsive(padding, offset) {
    return this._chartsService.getResponsive(padding, offset);
  }

}
