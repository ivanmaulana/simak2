import {Component, ViewEncapsulation} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle} from '@angular/common';
import {AlertComponent, PROGRESSBAR_DIRECTIVES} from 'ng2-bootstrap';
import {FILE_UPLOAD_DIRECTIVES, FileUploader} from 'ng2-file-upload';

import {BaCard} from '../../../../theme/components';

@Component({
  selector: 'praseminar',
  encapsulation: ViewEncapsulation.None,
  directives: [BaCard, AlertComponent, FILE_UPLOAD_DIRECTIVES, NgClass, NgStyle, CORE_DIRECTIVES, FORM_DIRECTIVES, PROGRESSBAR_DIRECTIVES],
  styles: [require('./praseminar.scss')],
  template: require('./praseminar.html'),
})
export class Praseminar {
  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  constructor() {
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  public alerts:Array<Object> = [
    {
      type: 'success',
      msg: `Perhatian ! Jadwal Pra Seminar 2017 sudah tersedia`,
      closable: true
    }
  ];

  public closeAlert(i:number):void {
    this.alerts.splice(i, 1);
  }
}
