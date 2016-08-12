import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {RouteConfig, Router} from '@angular/router-deprecated';

import {BaPageTop, BaContentTop, BaSidebarDosen, BaBackTop} from '../theme/components';

import {DashboardDosen} from './dashboardDosen';

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
  }
])
export class Dosen implements OnInit {
  private status;

  constructor(private route: Router) {
  }

  ngOnInit(){
    // this.status = localStorage.getItem('status');
    //
    // if(this.status === 'ce28eed1511f631af6b2a7bb0a85d636'){
    // }
    // else if(this.status === '5787be38ee03a9ae5360f54d9026465f'){
    //   this.route.navigate(['Pages']);
    // }
    // else {
    //   this.route.navigate(['Login']);
    // }
  }
}
