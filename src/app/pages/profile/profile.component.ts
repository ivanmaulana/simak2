import {Component, ViewEncapsulation} from '@angular/core';

import {BaCard} from '../../theme/components';
import {BaAppPicturePipe} from '../../theme/pipes';

@Component({
  selector: 'profile',
  pipes: [BaAppPicturePipe],
  directives: [BaCard],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./profile.scss')],
  template: require('./profile.html')
})
export class Profile {
  konferensi;
  topik;

  private nama: string = "Ivan Maulana Putra";
  private nim: string = "G64130076";
  private no: string = "08988918895";

  constructor() {
  }

}
