import {Component, ViewEncapsulation} from '@angular/core';

import {BaCard} from '../../../../theme/components';

@Component({
  selector: 'seminar2',
  encapsulation: ViewEncapsulation.None,
  directives: [BaCard],
  styles: [require('./seminar2.scss')],
  template: require('./seminar2.html'),
})
export class Seminar2 {

  constructor() {
  }
}
