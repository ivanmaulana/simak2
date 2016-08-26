import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {RouteConfig, Router, CanActivate} from '@angular/router-deprecated';
import {AuthHttp, JwtHelper, tokenNotExpired} from 'angular2-jwt';

import {BaPageTop, BaContentTop, BaSidebar, BaBackTop} from '../theme/components';

import {Dashboard} from './dashboard';
import {Menu} from './menu';
import {Pengajuan} from './pengajuan';
import {Log} from './log';
import {Profile} from './profile';
import {Kolokium} from './kolokium';
import {Seminar} from './seminar';
import {Sidang} from './sidang';
import {Praseminar} from './praseminar';
import {Skl} from './skl';

@Component({
  selector: 'pages',
  encapsulation: ViewEncapsulation.None,
  styles: [],
  directives: [BaPageTop, BaSidebar, BaContentTop, BaBackTop],
  template: `
    <ba-sidebar></ba-sidebar>
    <ba-page-top></ba-page-top>
    <div class="al-main">
      <div class="al-content">
        <ba-content-top></ba-content-top>
        <router-outlet></router-outlet>
      </div>
    </div>
    <footer class="al-footer clearfix">
      <div class="al-footer-right">Departemen Ilmu Komputer IPB</div>
      <div class="al-footer-main clearfix">
        <div class="al-copy">&copy; <a href="http://agri.web.id">Ivan Maulana</a> 2016</div>
      </div>
    </footer>
    <ba-back-top position="200"></ba-back-top>
    `
})
@RouteConfig([
  {
    name: 'Dashboard',
    component: Dashboard,
    path: '/dashboard',
    useAsDefault: true,
  },
  {
    name: 'Seminar',
    component: Seminar,
    path: '/seminar',
  },
  {
    name: 'Praseminar',
    component: Praseminar,
    path: '/praseminar',
  },
  {
    name: 'Menu',
    component: Menu,
    path: '/menu',
  },
  {
    name: 'Sidang',
    component: Sidang,
    path: '/sidang',
  },
  {
    name: 'Pengajuan',
    component: Pengajuan,
    path: '/pengajuan',
  },
  {
    name: 'Kolokium',
    component: Kolokium,
    path: '/kolokium',
  },
  {
    name: 'Profile',
    component: Profile,
    path: '/profile',
  },
  {
    name: 'Skl',
    component: Skl,
    path: '/skl',
  },
  {
    name: 'Log',
    component: Log,
    path: '/log',
  }
])

@CanActivate(() => tokenNotExpired())

export class Pages implements OnInit{
  private role;
  private token;
  private decode;

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private route: Router) {


  }

  ngOnInit(){
    this.token = localStorage.getItem('id_token');
    this.decode = this.jwtHelper.decodeToken(this.token);
    this.role = this.decode['role'];

    if (this.role === 1){
      this.route.navigate(['Admin']);
    }
    else if(this.role === 2){
      this.route.navigate(['Dosen']);
    }
    else if(this.role === 3){
      this.route.navigate(['Pages']);
    }
    else if(this.role === 4){
      this.route.navigate(['Dosen']);
    }
    else {
      this.route.navigate(['Login']);
    }
  }
}
