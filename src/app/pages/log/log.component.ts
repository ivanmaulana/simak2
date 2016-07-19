import {Component, ViewEncapsulation} from '@angular/core';

import {BaCard} from '../../theme/components';

@Component({
  selector: 'log',
  pipes: [],
  directives: [BaCard],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./log.scss')],
  template: require('./log.html')
})
export class Log {
  constructor() {
  }

}
