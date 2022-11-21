import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home',
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'theme',
        loadChildren: () =>
          import('./views/theme/theme.module').then((m) => m.ThemeModule),
      },
      {
        path: 'base',
        loadChildren: () =>
          import('./views/base/base.module').then((m) => m.BaseModule),
      },
      {
        path: 'buttons',
        loadChildren: () =>
          import('./views/buttons/buttons.module').then((m) => m.ButtonsModule),
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./views/forms/forms.module').then((m) => m.CoreUIFormsModule),
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./views/charts/charts.module').then((m) => m.ChartsModule),
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('./views/icons/icons.module').then((m) => m.IconsModule),
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./views/notifications/notifications.module').then(
            (m) => m.NotificationsModule
          ),
      },
      {
        path: 'widgets',
        loadChildren: () =>
          import('./views/widgets/widgets.module').then((m) => m.WidgetsModule),
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./views/profile/company-profile/company-profile.module').then(
            (m) => m.CompanyProfileModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'request-permission',
        loadChildren: () =>
          import('./views/request-permission/request-permission.module').then(
            (m) => m.RequestPermissionModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'recruiters',
        loadChildren: () =>
          import('./views/recruiters/recruiters.module').then(
            (m) => m.RecruitersModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'jobs',
        loadChildren: () =>
          import('./views/jobs/jobs.module').then((m) => m.JobsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'candidates',
        loadChildren: () =>
          import('./views/candidates/candidates.module').then(
            (m) => m.CandidatesModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'contacts',
        loadChildren: () =>
          import('./views/contacts/contacts.module').then(
            (m) => m.ContactsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'activities',
        loadChildren: () =>
          import('./views/activities/activities.module').then(
            (m) => m.ActivitiesModule
          ),
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404',
    },
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500',
    },
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./views/pages/login/login.module').then((m) => m.LoginModule),
    data: {
      title: 'Login Page',
    },
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./views/pages/forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordModule
      ),
    data: {
      title: 'Forgot Password Page',
    },
  },
  {
    path: 'reset-password',
    loadChildren: () =>
      import('./views/pages/reset-password/reset-password.module').then(
        (m) => m.ResetPasswordModule
      ),
    data: {
      title: 'Reset assword Page',
    },
  },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
