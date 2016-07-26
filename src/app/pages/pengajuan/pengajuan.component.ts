import {Component, ViewEncapsulation} from '@angular/core';

import {BaCard} from '../../theme/components';

@Component({
  selector: 'pengajuan',
  pipes: [],
  directives: [BaCard],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./pengajuan.scss')],
  template: require('./pengajuan.html')
})
export class Pengajuan {
  constructor() {
  }

}
