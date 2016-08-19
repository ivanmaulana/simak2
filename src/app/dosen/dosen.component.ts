import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {RouteConfig, Router, CanActivate} from '@angular/router-deprecated';
import {AuthHttp, JwtHelper, tokenNotExpired} from 'angular2-jwt';

import {BaPageTop, BaContentTop, BaSidebarDosen, BaBackTop} from '../theme/components';

import {DashboardDosen} from './dashboardDosen';
import {LogDosen} from './logDosen';

@Component({
  selector: 'dosen',
  encapsulation: ViewEncapsulation.None,
  styles: [],
  directives: [BaPageTop, BaSidebarDosen, BaContentTop, BaBackTop],
  template: `
    <ba-sidebar-dosen></ba-sidebar-dosen>
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
    name: 'DashboardDosen',
    component: DashboardDosen,
    path: '/dashboard',
    useAsDefault: true,
  },
  {
    name: 'LogDosen',
    component: LogDosen,
    path: '/log'
  }
])

@CanActivate(() => tokenNotExpired())

export class Dosen implements OnInit {
  private status;
  private token;
  private role;
  private decode;

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private route: Router) {
    this.token = localStorage.getItem('id_token');
    this.decode = this.jwtHelper.decodeToken(this.token);
    this.role = this.decode['role'];

    if (this.role === 1){
      this.route.navigate(['Admin']);
    }
    else if(this.role === 2){

    }
    else if(this.role === 3){
      this.route.navigate(['Pages']);
    }
    else if(this.role === 4){

    }
    else {
      this.route.navigate(['Login']);
    }
  }

  ngOnInit(){
    // this.token = localStorage.getItem('id_token');
    // this.decode = this.jwtHelper.decodeToken(this.token);
    // this.role = this.decode['role'];
    //
    // if (this.role === '1'){
    //   this.route.navigate(['Admin']);
    // }
    // else if(this.role === '2'){
    //
    // }
    // else if(this.role === '3'){
    //   this.route.navigate(['Pages']);
    // }
    // else if(this.role === '4'){
    //   this.route.navigate(['Dosen']);
    // }
    // else {
    //   this.route.navigate(['Login']);
    // }
  }
}
