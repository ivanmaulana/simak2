import {Component, ViewEncapsulation} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle} from '@angular/common';
import {AlertComponent, PROGRESSBAR_DIRECTIVES} from 'ng2-bootstrap';

import {BaCard} from '../../../../theme/components';

@Component({
  selector: 'konferensiAdmin',
  encapsulation: ViewEncapsulation.None,
  directives: [BaCard, AlertComponent, NgClass, NgStyle, CORE_DIRECTIVES, FORM_DIRECTIVES, PROGRESSBAR_DIRECTIVES],
  styles: [require('./konferensiAdmin.scss')],
  template: require('./konferensiAdmin.html'),
})

export class KonferensiAdmin {

}
