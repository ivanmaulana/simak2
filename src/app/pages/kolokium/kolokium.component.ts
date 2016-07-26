import {Component, ViewEncapsulation} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle} from '@angular/common';
import {AlertComponent, PROGRESSBAR_DIRECTIVES} from 'ng2-bootstrap';
import {FILE_UPLOAD_DIRECTIVES, FileUploader} from 'ng2-file-upload';

import {BaCard} from '../../theme/components';

// const URL = '/api/';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'kolokium',
  pipes: [],
  directives: [BaCard, AlertComponent, FILE_UPLOAD_DIRECTIVES, NgClass, NgStyle, CORE_DIRECTIVES, FORM_DIRECTIVES, PROGRESSBAR_DIRECTIVES],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./kolokium.scss')],
  template: require('./kolokium.html')
})
export class Kolokium {
  topik;
  max : number = 100;

  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  constructor() {
    this.topik = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae qui non vident, nihil umquam magnum ac cognitione dignum amaverunt. Nihil ad rem! Ne sit sane";
  }

  public success:Array<Object> = [
    {
      type: 'success',
      msg: `Perhatian ! Jadwal kolokium 2017 adalah 27 Juli 2016. Detail Lengkap`,
      closable: true
    }
  ];

  public danger:Array<Object> = [
    {
      type: 'danger',
      msg: `Pengisian & Upload makalah kolokium akan dibuka sampai 20 Juli 2016`,
      closable: true
    }
  ]

}
