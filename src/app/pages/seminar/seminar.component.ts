import {Component, ViewEncapsulation} from '@angular/core';

import {BaCard} from '../../theme/components';

@Component({
  selector: 'seminar',
  pipes: [],
  directives: [BaCard],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./seminar.scss')],
  template: require('./seminar.html')
})
export class Seminar {
  constructor() {
  }

}
