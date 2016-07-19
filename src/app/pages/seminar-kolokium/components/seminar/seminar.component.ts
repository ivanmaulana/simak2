import {Component, ViewEncapsulation} from '@angular/core';

import {BaCard} from '../../../../theme/components';

@Component({
  selector: 'seminar',
  encapsulation: ViewEncapsulation.None,
  directives: [BaCard],
  styles: [require('./seminar.scss')],
  template: require('./seminar.html'),
})

export class Seminar {

  constructor() {
  }
}
