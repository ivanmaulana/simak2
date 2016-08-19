import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {RouteConfig, Router, CanActivate} from '@angular/router-deprecated';
import {AuthHttp, JwtHelper, tokenNotExpired} from 'angular2-jwt';

import {BaPageTop, BaContentTop, BaSidebarAdmin, BaBackTop} from '../theme/components';

import {DashboardAdmin} from './dashboardAdmin';
import {PengajuanAdmin} from './pengajuanAdmin';
import {TaAdmin} from './taAdmin';
import {KolokiumAdmin} from './kolokiumAdmin';
import {PraseminarAdmin} from './praseminarAdmin';
import {ProfileAdmin} from './profileAdmin';
import {SeminarAdmin} from './seminarAdmin';
import {SidangAdmin} from './sidangAdmin';

@Component({
  selector: 'admin',
  encapsulation: ViewEncapsulation.None,
  styles: [],
  directives: [BaPageTop, BaSidebarAdmin, BaContentTop, BaBackTop],
  template: `
    <ba-sidebar-admin></ba-sidebar-admin>
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
    name: 'DashboardAdmin',
    component: DashboardAdmin,
    path: '/dashboard',
    useAsDefault: true,
  },
  {
    name: 'PengajuanAdmin',
    component: PengajuanAdmin,
    path: '/pengajuan',
  },
  {
    name: 'TaAdmin',
    component: TaAdmin,
    path: '/ta',
  },
  {
    name: 'KolokiumAdmin',
    component: KolokiumAdmin,
    path: '/kolokium',
  },
  {
    name: 'PraseminarAdmin',
    component: PraseminarAdmin,
    path: '/praseminar',
  },
  {
    name: 'ProfileAdmin',
    component: ProfileAdmin,
    path: '/profile',
  },
  {
    name: 'SeminarAdmin',
    component: SeminarAdmin,
    path: '/seminar/...',
  },
  {
    name: 'SidangAdmin',
    component: SidangAdmin,
    path: '/sidang',
  }
])

@CanActivate(() => tokenNotExpired())

export class Admin implements OnInit {
  private status;
  private token;
  private role;
  private decode;

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private route: Router) {

  }

  ngOnInit(){

    this.token = localStorage.getItem('id_token');

    if (this.token){
      // this.token = localStorage.getItem('id_token');
      // this.decode = this.jwtHelper.decodeToken(this.token);
      // this.role = this.decode['role'];
      // console.log('ada local storage :'+this.role);
      //
      // if (this.role === 1){
      //   this.route.navigate(['Admin']);
      // }
      // else if(this.role === 2){
      //   this.route.navigate(['Dosen']);
      // }
      // else if(this.role === 3){
      //
      // }
      // else if(this.role === 4){
      //   this.route.navigate(['Dosen']);
      // }
    }
    else {
      this.route.navigate(['Login']);
    }
  }
}
