import {Component, ViewEncapsulation} from '@angular/core';
import {RouteConfig} from '@angular/router-deprecated';

import {BaPageTop, BaContentTop, BaSidebarAdmin, BaBackTop} from '../theme/components';

import {DashboardAdmin} from './dashboardAdmin';

//
// import {Dashboard} from './dashboard';
// import {Ui} from './ui';
// import {Maps} from './maps';
// import {Forms} from './forms';
// import {Tables} from './tables';
// import {Menu} from './menu';
// import {Pengajuan} from './pengajuan';
// import {Log} from './log';
// import {Profile} from './profile';
// import {Kolokium} from './kolokium';
// import {Seminar} from './seminar';
// import {Sidang} from './sidang';
// import {Praseminar} from './praseminar';
// import {Skl} from './skl';

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
  }
  // {
  //   name: 'Ui',
  //   component: Ui,
  //   path: '/ui/...',
  // },
  // {
  //   name: 'Seminar',
  //   component: Seminar,
  //   path: '/seminar',
  // },
  // {
  //   name: 'Praseminar',
  //   component: Praseminar,
  //   path: '/praseminar',
  // },
  // {
  //   name: 'Menu',
  //   component: Menu,
  //   path: '/menu',
  // },
  // {
  //   name: 'Sidang',
  //   component: Sidang,
  //   path: '/sidang',
  // },
  // {
  //   name: 'Pengajuan',
  //   component: Pengajuan,
  //   path: '/pengajuan',
  // },
  // {
  //   name: 'Kolokium',
  //   component: Kolokium,
  //   path: '/kolokium',
  // },
  // {
  //   name: 'Profile',
  //   component: Profile,
  //   path: '/profile',
  // },
  // {
  //   name: 'Skl',
  //   component: Skl,
  //   path: '/skl',
  // },
  // {
  //   name: 'Log',
  //   component: Log,
  //   path: '/log',
  // },
  // {
  //   name: 'Maps',
  //   component: Maps,
  //   path: '/maps/...',
  // },
  // {
  //   name: 'Forms',
  //   component: Forms,
  //   path: '/forms/...',
  // },
  // {
  //   name: 'Tables',
  //   component: Tables,
  //   path: '/tables/...',
  // }
])
export class Admin {

  constructor() {
  }

  ngOnInit() {
  }
}
