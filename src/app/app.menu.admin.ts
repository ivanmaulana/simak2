export const menuItemsAdmin = [
  {
    title: 'Dashboard',
    component: 'DashboardAdmin',
    icon: 'ion-android-home',
    selected: false,
    expanded: false
  },
  {
    title: 'Pengajuan TA',
    component: 'PengajuanAdmin',
    icon: 'ion-edit',
    selected: false,
    expanded: false
  },
  {
    title: 'Penentuan TA',
    component: 'TaAdmin',
    icon: 'ion-document',
    selected: false,
    expanded: false
  },
  {
    title: 'Kolokium',
    component: 'KolokiumAdmin',
    icon: 'ion-document-text',
    selected: false,
    expanded: false
  },
  {
    title: 'Praseminar',
    component: 'PraseminarAdmin',
    icon: 'ion-code-working',
    selected: false,
    expanded: false
  },
  {
    title: 'Seminar',
    component: 'SeminarAdmin',
    icon: 'ion-ribbon-b',
    selected: false,
    expanded: false,
    order: 700,
    subMenu: [
      {
        title: 'Konferensi',
        component: 'KonferensiAdmin',
      },
      {
        title: 'Mini Conference',
        component: 'MiconAdmin',
      },{
        title: 'Seminar Mandiri',
        component: 'MandiriAdmin',
      }
    ]
  },{
    title: 'Sidang',
    component: 'SidangAdmin',
    icon: 'ion-ribbon-b',
    selected: false,
    expanded: false
  },
  {
    title: 'Profile',
    component: 'ProfileAdmin',
    icon: 'ion-person',
    selected: false,
    expanded: false
  }
];
