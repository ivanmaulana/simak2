import {Component, ViewEncapsulation} from '@angular/core';

import {BaCard} from '../../../../theme/components';

@Component({
  selector: 'kolokium',
  encapsulation: ViewEncapsulation.None,
  directives: [BaCard],
  styles: [require('./kolokium.scss')],
  template: require('./kolokium.html'),
})
export class Kolokium {

  constructor() {
  }
}
