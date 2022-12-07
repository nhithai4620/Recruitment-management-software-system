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
];
