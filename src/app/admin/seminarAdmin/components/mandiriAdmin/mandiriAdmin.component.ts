import {Component, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';
import {RouteConfig} from '@angular/router-deprecated';

import {BaCard} from '../../../../theme/components';
import {CORE_DIRECTIVES, NgClass, NgStyle, FORM_DIRECTIVES, } from '@angular/common';
import {TAB_DIRECTIVES, DATEPICKER_DIRECTIVES, AlertComponent, PROGRESSBAR_DIRECTIVES} from 'ng2-bootstrap';

// const URL = '/api/';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'mandiriAdmin',
  encapsulation: ViewEncapsulation.None,
  directives: [BaCard, AlertComponent, TAB_DIRECTIVES, CORE_DIRECTIVES, NgClass, NgStyle, PROGRESSBAR_DIRECTIVES, FORM_DIRECTIVES],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [require('./mandiriAdmin.scss')],
  template: require('./mandiriAdmin.html'),
})

export class MandiriAdmin {

}
