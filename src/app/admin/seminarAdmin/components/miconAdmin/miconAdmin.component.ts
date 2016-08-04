import {Component, ViewEncapsulation} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle} from '@angular/common';
import {AlertComponent, PROGRESSBAR_DIRECTIVES} from 'ng2-bootstrap';

import {BaCard} from '../../../../theme/components';

@Component({
  selector: 'miconAdmin',
  encapsulation: ViewEncapsulation.None,
  directives: [BaCard, AlertComponent, NgClass, NgStyle, CORE_DIRECTIVES, FORM_DIRECTIVES, PROGRESSBAR_DIRECTIVES],
  styles: [require('./miconAdmin.scss')],
  template: require('./miconAdmin.html'),
})

export class MiconAdmin{

}
