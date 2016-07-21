import {Component, ViewEncapsulation} from '@angular/core';

import {BaCard} from '../../theme/components';
import {BaAppPicturePipe} from '../../theme/pipes';
import {BaPictureUploader} from '../../theme/components';

@Component({
  selector: 'profile',
  pipes: [BaAppPicturePipe],
  directives: [BaCard, BaPictureUploader],
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

  public defaultPicture = 'assets/img/theme/no-photo.png';
  public profile:any = {
    picture: 'assets/img/app/profile/Nasta.png'
  };
  public uploaderOptions:any = {
    // url: 'http://website.com/upload'
  };

  constructor() {
  }

}
