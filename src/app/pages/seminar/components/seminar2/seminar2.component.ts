import {Component, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';

import {BaCard} from '../../../../theme/components';
import {CORE_DIRECTIVES} from '@angular/common';
import {TAB_DIRECTIVES} from 'ng2-bootstrap';

@Component({
  selector: 'seminar2',
  encapsulation: ViewEncapsulation.None,
  directives: [BaCard, TAB_DIRECTIVES, CORE_DIRECTIVES],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [require('./seminar2.scss')],
  template: require('./seminar2.html'),
})
export class Seminar2 {
  topik;

  constructor() {
    this.topik = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae qui non vident, nihil umquam magnum ac cognitione dignum amaverunt. Nihil ad rem! Ne sit sane";
  }

  public tabs:Array<any> = [
  {title: 'Dynamic Title 1', content: 'Dynamic content 1'},
  {title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true},
  {title: 'Dynamic Title 3', content: 'Dynamic content 3', removable: true}
  ];

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
