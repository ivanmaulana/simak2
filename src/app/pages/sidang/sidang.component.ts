import {Component, ViewEncapsulation} from '@angular/core';
import {CORE_DIRECTIVES, NgClass, NgStyle, FORM_DIRECTIVES, } from '@angular/common';
import {TAB_DIRECTIVES, DATEPICKER_DIRECTIVES, AlertComponent, PROGRESSBAR_DIRECTIVES} from 'ng2-bootstrap';

import {BaCard} from '../../theme/components';

@Component({
  selector: 'sidang',
  pipes: [],
  directives: [BaCard, AlertComponent, TAB_DIRECTIVES, CORE_DIRECTIVES, NgClass, NgStyle, PROGRESSBAR_DIRECTIVES, FORM_DIRECTIVES],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./sidang.scss')],
  template: require('./sidang.html')
})
export class Sidang {
  constructor() {
  }

}
