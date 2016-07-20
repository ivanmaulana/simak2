import {Component, ViewEncapsulation} from '@angular/core';

import {BaCard} from '../../../../theme/components';

@Component({
  selector: 'praseminar',
  encapsulation: ViewEncapsulation.None,
  directives: [BaCard],
  styles: [require('./praseminar.scss')],
  template: require('./praseminar.html'),
})
export class Praseminar {

  constructor() {
  }
}
