import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {RouteConfig, Router} from '@angular/router-deprecated';

import {BaPageTop, BaContentTop, BaSidebar, BaBackTop} from '../theme/components';

import {Dashboard} from './dashboard';
import {Ui} from './ui';
import {Maps} from './maps';
import {Forms} from './forms';
import {Tables} from './tables';
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
    name: 'Ui',
    component: Ui,
    path: '/ui/...',
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
  },
  {
    name: 'Maps',
    component: Maps,
    path: '/maps/...',
  },
  {
    name: 'Forms',
    component: Forms,
    path: '/forms/...',
  },
  {
    name: 'Tables',
    component: Tables,
    path: '/tables/...',
  }
])
export class Pages implements OnInit{
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
