import {Component, ViewEncapsulation} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle} from '@angular/common';
import {AlertComponent, PROGRESSBAR_DIRECTIVES} from 'ng2-bootstrap';
import {FILE_UPLOAD_DIRECTIVES, FileUploader} from 'ng2-file-upload';

import {BaCard} from '../../theme/components';

// const URL = '/api/';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'praseminar',
  encapsulation: ViewEncapsulation.None,
  directives: [BaCard, AlertComponent, FILE_UPLOAD_DIRECTIVES, NgClass, NgStyle, CORE_DIRECTIVES, FORM_DIRECTIVES, PROGRESSBAR_DIRECTIVES],
  styles: [require('./praseminar.scss')],
  template: require('./praseminar.html'),
})
export class Praseminar {
  topik;
  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  constructor() {
    this.topik = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae qui non vident, nihil umquam magnum ac cognitione dignum amaverunt. Nihil ad rem! Ne sit sane";
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  public success:Array<Object> = [
    {
      type: 'success',
      msg: `Perhatian ! Jadwal praseminar2017 adalah 27 Juli 2016. Detail Lengkap`,
      closable: true
    }
  ];

  public danger:Array<Object> = [
    {
      type: 'danger',
      msg: `Pengisian & Upload makalah praseminar akan dibuka sampai 20 Juli 2016`,
      closable: true
    }
  ]

}
