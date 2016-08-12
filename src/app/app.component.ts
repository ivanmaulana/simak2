import './app.loader.ts';

import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {RouteConfig, Router} from '@angular/router-deprecated';

import {Pages} from './pages';
import {Admin} from './admin';
import {Dosen} from './dosen';

import {Login} from './auth/login';
import {AppState} from './app.state';
import {BaThemeConfigProvider, BaThemeConfig} from './theme';
import {BaThemeRun} from './theme/directives';
import {BaImageLoaderService, BaThemePreloader, BaThemeSpinner} from './theme/services';

import {layoutPaths} from './theme/theme.constants';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  pipes: [],
  directives: [BaThemeRun],
  providers: [BaThemeConfigProvider, BaThemeConfig, BaImageLoaderService, BaThemeSpinner],
  encapsulation: ViewEncapsulation.None,
  styles: [require('normalize.css'), require('./app.scss')],
  template: `
    <main [ngClass]="{'menu-collapsed': isMenuCollapsed}" baThemeRun>
      <div class="additional-bg"></div>
      <router-outlet></router-outlet>
    </main>
  `
})
@RouteConfig([
  {
    path: '/mahasiswa/...',
    name: 'Pages',
    component: Pages,
    useAsDefault: true
  },
  {
    path: '/admin/...',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/dosen/...',
    name: 'Dosen',
    component: Dosen
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  // handle any non-registered route
  // and simply redirects back to dashboard page
  // you can specify any customer 404 page while it's not built in ito ng2-admin
  {
    path: '/**',
    redirectTo: ['Pages']
  }
])
export class App implements OnInit{
  private status;

  ngOnInit(){
    // this.status = localStorage.getItem('status');
    //
    // if(this.status === 'dosen'){
    //   this.route.navigate(['Admin']);
    // }
    // else if(this.status === 'mahasiswa'){
    //   this.route.navigate(['Pages']);
    // }
    // else {
    //   this.route.navigate(['Login']);
    // }
  }

  isMenuCollapsed:boolean = false;

  constructor(private route: Router, private _state:AppState, private _imageLoader:BaImageLoaderService, private _spinner:BaThemeSpinner, private _config:BaThemeConfig) {
    localStorage.setItem("nim", "G64130076");
    localStorage.setItem("nama", "IVAN MAULANA PUTRA");
    localStorage.setItem("token", "edcb8169a18d121cbdaa7a9b3b38951c");
    localStorage.setItem("status", "5787be38ee03a9ae5360f54d9026465f");

    this._loadImages();

    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  public ngAfterViewInit():void {
    // hide spinner once all loaders are completed
    BaThemePreloader.load().then((values) => {
      this._spinner.hide();
    });
  }

  private _loadImages():void {
    // register some loaders
    BaThemePreloader.registerLoader(this._imageLoader.load(layoutPaths.images.root + 'sky-bg.jpg'));
  }
}
