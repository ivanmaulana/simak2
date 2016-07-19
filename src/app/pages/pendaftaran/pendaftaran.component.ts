import {Component, ViewEncapsulation} from '@angular/core';

import {BaCard} from '../../theme/components';

@Component({
  selector: 'pendaftaran',
  pipes: [],
  directives: [BaCard],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./pendaftaran.scss')],
  template: require('./pendaftaran.html')
})
export class Pendaftaran {
  constructor() {
  }

}
