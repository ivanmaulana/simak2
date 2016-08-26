import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {RouteConfig, Router} from '@angular/router-deprecated';

import {BaPageTop, BaContentTop, BaSidebarAdmin, BaBackTop} from '../theme/components';

@Component({
  selector: 'auth',
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

])

export class Auth implements OnInit{
  private status;

  constructor(private route: Router) {

  }

  ngOnInit(){

  }
}
