import {Component, ViewEncapsulation} from '@angular/core';
import {BaCard} from '../../../../theme/components';

import {ChartistJsService} from './chartistJs.service';
import {BaChartistChart} from '../../../../theme/components';
import {CORE_DIRECTIVES} from '@angular/common';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, FormGroup, FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

import {TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap';

@Component({
  selector: 'chartist-js',
  encapsulation: ViewEncapsulation.None,
  pipes: [],
  providers: [ChartistJsService],
  directives: [BaCard, BaChartistChart],
  styles: [require('chartist/dist/chartist.css'), require('./chartistJs.scss')],
  template: require('./chartistJs.html'),
})

export class ChartistJs {

  public query = '';
  public countries = [ "Albania","Andorra","Armenia","Austria","Azerbaijan","Belarus",
                      "Belgium","Bosnia & Herzegovina","Bulgaria","Croatia","Cyprus",
                      "Czech Republic","Denmark","Estonia","Finland","France","Georgia",
                      "Germany","Greece","Hungary","Iceland","Ireland","Italy","Kosovo",
                      "Latvia","Liechtenstein","Lithuania","Luxembourg","Macedonia","Malta",
                      "Moldova","Monaco","Montenegro","Netherlands","Norway","Poland",
                      "Portugal","Romania","Russia","San Marino","Serbia","Slovakia","Slovenia",
                      "Spain","Sweden","Switzerland","Turkey","Ukraine","United Kingdom","Vatican City"];
  public filteredList = [];
  public elementRef;
  data:any;

  constructor(private _chartistJsService:ChartistJsService) {
  }

  ngOnInit() {

  }

  getResponsive(padding, offset) {
    return this._chartistJsService.getResponsive(padding, offset);
  }

  filter() {
    if (this.query !== ""){
        this.filteredList = this.countries.filter(function(el){
            return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
        }.bind(this));
    }else{
        this.filteredList = [];
    }
  }

  select(item){
      this.query = item;
      this.filteredList = [];
  }
}
