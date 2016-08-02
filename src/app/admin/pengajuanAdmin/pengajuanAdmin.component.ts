import {Component, ViewEncapsulation} from '@angular/core';

import {BaCard} from '../../theme/components';

@Component({
  selector: 'pengajuanAdmin',
  pipes: [],
  directives: [BaCard],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./pengajuanAdmin.scss')],
  template: require('./pengajuanAdmin.html')
})
export class PengajuanAdmin {

  constructor() {
  }

}
