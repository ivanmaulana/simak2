import {Component, ViewEncapsulation} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {AlertComponent} from 'ng2-bootstrap';

import {BaCard} from '../../theme/components';

@Component({
  selector: 'kolokium',
  pipes: [],
  directives: [BaCard, AlertComponent, CORE_DIRECTIVES],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./kolokium.scss')],
  template: require('./kolokium.html')
})
export class Kolokium {
  constructor() {
  }

  public alerts:Array<Object> = [
    {
      type: 'success',
      msg: `Perhatian ! Jadwal kolokium 2017 sudah tersedia`,
      closable: true
    }
  ];

  public closeAlert(i:number):void {
    this.alerts.splice(i, 1);
  }

}
