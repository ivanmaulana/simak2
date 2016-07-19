export const menuItems = [
  {
    title: 'Dashboard',
    component: 'Dashboard',
    icon: 'ion-android-home',
    selected: false,
    expanded: false,
    order: 0
  },
  {
    title: 'Pendaftaran Skripsi',
    component: 'Charts',
    icon: 'ion-document-text',
    selected: false,
    expanded: false,
    order: 100
  },
  {
    title: 'Pendaftaran Skripsi',
    component: 'Pendaftaran',
    icon: 'ion-document-text',
    selected: false,
    expanded: false,
    order: 100
  },
  {
    title: 'Menu',
    component: 'Menu',
    icon: 'ion-android-home',
    selected: false,
    expanded: false,
    order: 200
  },
  {
    title: 'UI Features',
    component: 'Ui',
    icon: 'ion-android-exit',
    selected: false,
    expanded: false,
    order: 300,
    subMenu: [
      {
        title: 'Typography',
        component: 'Typography',
      },
      {
        title: 'Buttons',
        component: 'Buttons',
      },
      {
        title: 'Icons',
        component: 'Icons',
      },
      {
        title: 'Grid',
        component: 'Grid',
      },
    ]
  },
  {
    title: 'Form Elements',
    component: 'Forms',
    icon: 'ion-compose',
    selected: false,
    expanded: false,
    order: 400,
    subMenu: [
      {
        title: 'Form Inputs',
        component: 'Inputs',
      },
      {
        title: 'Form Layouts',
        component: 'Layouts',
      },
    ]
  },
  {
    title: 'Tables',
    component: 'Tables',
    icon: 'ion-grid',
    selected: false,
    expanded: false,
    order: 500,
    subMenu: [
      {
        title: 'Basic Tables',
        component: 'BasicTables',
      }
    ]
  },
  {
    title: 'Maps',
    component: 'Maps',
    icon: 'ion-ios-location-outline',
    selected: false,
    expanded: false,
    order: 600,
    subMenu: [
      {
        title: 'Google Maps',
        component: 'GoogleMaps',
      },
      {
        title: 'Leaflet Maps',
        component: 'LeafletMaps',
      },
      {
        title: 'Bubble Maps',
        component: 'BubbleMaps',
      },
      {
        title: 'Line Maps',
        component: 'LineMaps',
      }
    ]
  },
  {
    title: 'Pages',
    icon: 'ion-document',
    selected: false,
    expanded: false,
    order: 650,
    subMenu: [
      {
        title: 'Login',
        url: '#/login',
      },
      {
        title: 'Register',
        url: '#/register',
      }
    ]
  },
  {
    title: 'Menu Level 1',
    icon: 'ion-ios-more',
    selected: false,
    expanded: false,
    order: 700,
    subMenu: [
      {
        title: 'Menu Level 1.1',
        url: '#',
        disabled: true,
        selected: false,
        expanded: false
      },
      {
        title: 'Menu Level 1.2',
        url: '#',
        subMenu: [{
          title: 'Menu Level 1.2.1',
          url: '#',
          disabled: true,
          selected: false,
          expanded: false
        }]
      }
    ]
  },
  {
    title: 'External Link',
    url: 'http://akveo.com',
    icon: 'ion-android-exit',
    selected: false,
    expanded: false,
    order: 800,
    target: '_blank'
  }
];
