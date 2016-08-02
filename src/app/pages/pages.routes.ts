import {RouterConfig} from '@angular/router';
import {Pages} from './pages.component';

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

export const PagesRoutes:RouterConfig = [
  {
    path: 'pages',
    component: Pages,
    children: [{
      path: 'dashboard',
      component: Dashboard,
      // data: {
      //     menu: {
      //       title: 'Dashboard',
      //       icon: 'ion-android-home',
      //       selected: false,
      //       expanded: false,
      //       order: 0
      //     }
      //   }

      }


    ]

  }
]
