import {Component, ViewEncapsulation} from '@angular/core';

import {AppState} from '../../../app.state';
import {BaProfilePicturePipe} from '../../pipes';
import {BaMsgCenter} from '../../components/baMsgCenter';
import {BaScrollPosition} from '../../directives';

import {ToastsManager} from 'ng2-toastr/ng2-toastr';

import {Router} from '@angular/router-deprecated';

@Component({
  selector: 'ba-page-top',
  styles: [require('./baPageTop.scss')],
  template: require('./baPageTop.html'),
  directives: [BaMsgCenter, BaScrollPosition],
  providers: [ToastsManager],
  pipes: [BaProfilePicturePipe],
  encapsulation: ViewEncapsulation.None
})
export class BaPageTop {
  private date;

  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = false;

  constructor(private _state:AppState, private route: Router, private toastr: ToastsManager) {
    this.date = new Date();

    setInterval(() => {
      this.date = new Date();
    }, 1000);

    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }

  signOut(){
    localStorage.clear();
    this.showSuccess();
    this.route.navigate(['Login']);
  }

  showSuccess() {
    this.toastr.success("Anda Berhasil Logout", 'Success !');
  }
}
