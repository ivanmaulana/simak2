import {Component, ViewEncapsulation} from '@angular/core';

import {BaCard} from '../../theme/components';

@Component({
  selector: 'praseminar',
  pipes: [],
  directives: [BaCard],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./praseminar.scss')],
  template: require('./praseminar.html')
})
export class Praseminar {
  constructor() {
  }

}
