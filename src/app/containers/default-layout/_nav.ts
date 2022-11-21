import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    title: true,
    name: 'Company',
  },
  {
    name: 'Company Profile',
    url: '/profile',
    iconComponent: { name: 'cil-user' },
  },
  {
    name: 'Request permission',
    url: '/request-permission',
    iconComponent: { name: 'cil-bell' },
    children: [
      {
        name: 'Request',
        url: '/request-permission/requests',
      },
      {
        name: 'Permisions',
        url: '/request-permission/permissions',
      },
    ],
  },
  {
    name: 'Contacts',
    url: '/contacts',
    iconComponent: { name: 'cil-user' },
  },
  {
    title: true,
    name: 'Main features',
  },
  {
    name: 'Recruiters',
    url: '/recruiters',
    iconComponent: { name: 'cil-star' },
  },
  {
    name: 'Job requisitions',
    url: '/jobs',
    iconComponent: { name: 'cil-task' },
  },
  {
    name: 'Candidates',
    url: '/candidates',
    linkProps: { fragment: 'someAnchor' },
    iconComponent: { name: 'cil-people' },
  },
  {
    title: true,
    name: 'Activities',
  },
  {
    name: 'Task',
    url: '/activities',
    iconComponent: { name: 'cil-task' },
  },
  {
    name: 'Meeting',
    url: '/activities',
    linkProps: { fragment: 'someAnchor' },
    iconComponent: { name: 'cil-notes' },
  },
  {
    name: 'Interviews',
    url: '/activities',
    iconComponent: { name: 'cil-calendar' },
  },
  {
    name: 'Call',
    url: '/activities',
    iconComponent: { name: 'cil-cursor' },
  },
  {
    name: 'Components',
    title: true,
  },
  {
    name: 'Base',
    url: '/base',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Accordion',
        url: '/base/accordion',
      },
      {
        name: 'Breadcrumbs',
        url: '/base/breadcrumbs',
      },
      {
        name: 'Cards',
        url: '/base/cards',
      },
      {
        name: 'Carousel',
        url: '/base/carousel',
      },
      {
        name: 'Collapse',
        url: '/base/collapse',
      },
      {
        name: 'List Group',
        url: '/base/list-group',
      },
      {
        name: 'Navs & Tabs',
        url: '/base/navs',
      },
      {
        name: 'Pagination',
        url: '/base/pagination',
      },
      {
        name: 'Placeholder',
        url: '/base/placeholder',
      },
      {
        name: 'Popovers',
        url: '/base/popovers',
      },
      {
        name: 'Progress',
        url: '/base/progress',
      },
      {
        name: 'Spinners',
        url: '/base/spinners',
      },
      {
        name: 'Tables',
        url: '/base/tables',
      },
      {
        name: 'Tabs',
        url: '/base/tabs',
      },
      {
        name: 'Tooltips',
        url: '/base/tooltips',
      },
    ],
  },
  {
    name: 'Buttons',
    url: '/buttons',
    iconComponent: { name: 'cil-cursor' },
    children: [
      {
        name: 'Buttons',
        url: '/buttons/buttons',
      },
      {
        name: 'Button groups',
        url: '/buttons/button-groups',
      },
      {
        name: 'Dropdowns',
        url: '/buttons/dropdowns',
      },
    ],
  },
  {
    name: 'Forms',
    url: '/forms',
    iconComponent: { name: 'cil-notes' },
    children: [
      {
        name: 'Form Control',
        url: '/forms/form-control',
      },
      {
        name: 'Select',
        url: '/forms/select',
      },
      {
        name: 'Checks & Radios',
        url: '/forms/checks-radios',
      },
      {
        name: 'Range',
        url: '/forms/range',
      },
      {
        name: 'Input Group',
        url: '/forms/input-group',
      },
      {
        name: 'Floating Labels',
        url: '/forms/floating-labels',
      },
      {
        name: 'Layout',
        url: '/forms/layout',
      },
      {
        name: 'Validation',
        url: '/forms/validation',
      },
    ],
  },
  {
    name: 'Charts',
    url: '/charts',
    iconComponent: { name: 'cil-chart-pie' },
  },
  {
    name: 'Icons',
    iconComponent: { name: 'cil-star' },
    url: '/icons',
    children: [
      {
        name: 'CoreUI Free',
        url: '/icons/coreui-icons',
        badge: {
          color: 'success',
          text: 'FREE',
        },
      },
      {
        name: 'CoreUI Flags',
        url: '/icons/flags',
      },
      {
        name: 'CoreUI Brands',
        url: '/icons/brands',
      },
    ],
  },
  {
    name: 'Notifications',
    url: '/notifications',
    iconComponent: { name: 'cil-bell' },
    children: [
      {
        name: 'Alerts',
        url: '/notifications/alerts',
      },
      {
        name: 'Badges',
        url: '/notifications/badges',
      },
      {
        name: 'Modal',
        url: '/notifications/modal',
      },
      {
        name: 'Toast',
        url: '/notifications/toasts',
      },
    ],
  },
  {
    name: 'Widgets',
    url: '/widgets',
    iconComponent: { name: 'cil-calculator' },
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    title: true,
    name: 'Extras',
  },
  {
    name: 'Pages',
    url: '/login',
    iconComponent: { name: 'cil-star' },
    children: [
      {
        name: 'Login',
        url: '/login',
      },
      {
        name: 'Register',
        url: '/register',
      },
      {
        name: 'Error 404',
        url: '/404',
      },
      {
        name: 'Error 500',
        url: '/500',
      },
    ],
  },
  {
    title: true,
    name: 'Theme',
  },
  {
    name: 'Colors',
    url: '/theme/colors',
    iconComponent: { name: 'cil-drop' },
  },
  {
    name: 'Typography',
    url: '/theme/typography',
    linkProps: { fragment: 'someAnchor' },
    iconComponent: { name: 'cil-pencil' },
  },
];
