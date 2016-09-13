import {Component, ViewEncapsulation} from '@angular/core';

import {AppState} from '../../../app.state';
import {BaProfilePicturePipe} from '../../pipes';
import {BaMsgCenter} from '../../components/baMsgCenter';
import {BaScrollPosition} from '../../directives';
import {AuthHttp, JwtHelper, tokenNotExpired} from 'angular2-jwt';

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

  private token;
  private decode;
  private nim;
  private id;
  private nama;
  private role;

  private date;
  jwtHelper: JwtHelper = new JwtHelper();
  private foto = 'http://simak.apps.cs.ipb.ac.id/upload/filePhoto/foto-'+this.nim+'-'+this.nama+'.png';

  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = false;

  constructor(private _state:AppState, private route: Router, private toastr: ToastsManager) {
    this.getLocalStorage();

    this.date = new Date();

    setInterval(() => {
      this.date = new Date();
    }, 1000);

    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });


  }

  getLocalStorage(){
    this.token = localStorage.getItem('id_token');

    this.decode = this.jwtHelper.decodeToken(this.token);
    this.id = this.decode['id'];
    this.nim = this.decode['nim'];
    this.nama = this.decode['nama'];
    this.role = this.decode['role'];
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
