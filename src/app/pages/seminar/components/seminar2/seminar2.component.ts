import {Component, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';
import {RouteConfig} from '@angular/router-deprecated';

import {BaCard} from '../../../../theme/components';
import {CORE_DIRECTIVES, NgClass, NgStyle, FORM_DIRECTIVES, } from '@angular/common';
import {TAB_DIRECTIVES, DATEPICKER_DIRECTIVES, AlertComponent, PROGRESSBAR_DIRECTIVES} from 'ng2-bootstrap';
import {FILE_UPLOAD_DIRECTIVES, FileUploader} from 'ng2-file-upload';

// const URL = '/api/';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'seminar2',
  encapsulation: ViewEncapsulation.None,
  directives: [BaCard, AlertComponent, TAB_DIRECTIVES, CORE_DIRECTIVES, FILE_UPLOAD_DIRECTIVES, NgClass, NgStyle, CORE_DIRECTIVES, PROGRESSBAR_DIRECTIVES, FORM_DIRECTIVES],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [require('./seminar2.scss')],
  template: require('./seminar2.html'),
})

export class Seminar2 {
  public topik: string;
  public content: string;
  public date: string;
  public seminarBersama: string;

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

  public tabs:Array<any> = [
  {title: 'Dynamic Title 1', content: 'Dynamic content 1'},
  {title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true},
  {title: 'Dynamic Title 3', content: 'Dynamic content 3', removable: true}
  ];

  constructor() {
    this.topik = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae qui non vident, nihil umquam magnum ac cognitione dignum amaverunt. Nihil ad rem! Ne sit sane";

    this.seminarBersama = "";
  }

  public alerts:Array<Object> = [
    {
      type: 'success',
      msg: `Perhatian ! Jadwal Mini Conference 2017 sudah tersedia`,
      closable: true
    }
  ];

  public closeAlert(i:number):void {
    this.alerts.splice(i, 1);
  }


  public alertMe():void {
    setTimeout(function ():void {
      alert('You\'ve selected the alert tab!');
    });
  };

  public setActiveTab(index:number):void {
    this.tabs[index].active = true;
  };

  public removeTabHandler(/*tab:any*/):void {
    console.log('Remove Tab handler');
  };


}
