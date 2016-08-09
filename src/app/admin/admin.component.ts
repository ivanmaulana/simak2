import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {RouteConfig, Router} from '@angular/router-deprecated';

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
export class Admin implements OnInit {
  private status;

  constructor(private route: Router) {
  }

  ngOnInit(){
    this.status = localStorage.getItem('status');

    if(this.status === 'ce28eed1511f631af6b2a7bb0a85d636'){
      this.route.navigate(['Admin']);
    }
    else if(this.status === '5787be38ee03a9ae5360f54d9026465f'){
      this.route.navigate(['Pages']);
    }
    else {
      this.route.navigate(['Login']);
    }
  }
}
