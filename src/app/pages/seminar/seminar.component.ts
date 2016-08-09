import {Component, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';

import {CORE_DIRECTIVES, NgClass, NgStyle, FORM_DIRECTIVES, } from '@angular/common';
import {TAB_DIRECTIVES, AlertComponent, PROGRESSBAR_DIRECTIVES} from 'ng2-bootstrap';
import {FILE_UPLOAD_DIRECTIVES, FileUploader} from 'ng2-file-upload';

import {MahasiswaService} from '../service';

import {BaCard} from '../../theme/components';

// const URL = '/api/';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'seminar',
  encapsulation: ViewEncapsulation.None,
  providers: [MahasiswaService],
  directives: [BaCard, AlertComponent, TAB_DIRECTIVES, CORE_DIRECTIVES, FILE_UPLOAD_DIRECTIVES, NgClass, NgStyle, PROGRESSBAR_DIRECTIVES, FORM_DIRECTIVES],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [require('./seminar.scss')],
  template: require('./seminar.html'),
})
export class Seminar {
  public topik: string;
  public content: string;
  public date: string;
  public seminarBersama: string;
  max : number = 100;
  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  public tabs:Array<any> = [
  {title: 'Dynamic Title 1', content: 'Dynamic content 1'},
  {title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true},
  {title: 'Dynamic Title 3', content: 'Dynamic content 3', removable: true}
  ];

  constructor(private data: MahasiswaService) {
    this.topik = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae qui non vident, nihil umquam magnum ac cognitione dignum amaverunt. Nihil ad rem! Ne sit sane";
    this.seminarBersama = "";
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
