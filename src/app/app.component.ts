import './app.loader.ts';

import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {RouteConfig, Router} from '@angular/router-deprecated';
import {AuthHttp, JwtHelper, tokenNotExpired} from 'angular2-jwt';

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
    component: Pages
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
    component: Login,
    useAsDefault: true
  },
  {
    path: '/**',
    redirectTo: ['Login']
  }
])
export class App implements OnInit{
  private status;
  private token;
  private decode;
  private role;

  jwtHelper: JwtHelper = new JwtHelper();

  ngOnInit(){

    if (localStorage.getItem('id_token')){
      this.token = localStorage.getItem('id_token');
      this.decode = this.jwtHelper.decodeToken(this.token);
      this.role = this.decode['role'];
      // console.log('ada local storage :'+this.role);

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
    else {
      this.route.navigate(['Login']);
    }

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
    //   this.route.navigate(['Pages']);
    // }
    // else if(this.role === 4){
    //   this.route.navigate(['Dosen']);
    // }
    // else {
    //   this.route.navigate(['Login']);
    // }

  }

  isMenuCollapsed:boolean = false;

  constructor(private route: Router, private _state:AppState, private _imageLoader:BaImageLoaderService, private _spinner:BaThemeSpinner, private _config:BaThemeConfig) {

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
