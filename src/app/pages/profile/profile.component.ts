import {Component, ViewEncapsulation} from '@angular/core';

import {BaCard} from '../../theme/components';

@Component({
  selector: 'profile',
  pipes: [],
  directives: [BaCard],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./profile.scss')],
  template: require('./profile.html')
})
export class Profile {
  constructor() {
  }

}
