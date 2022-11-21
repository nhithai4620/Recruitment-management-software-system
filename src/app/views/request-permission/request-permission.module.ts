import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RequestsModule } from './requests/requests.module';
import { PermissionsModule } from './permissions/permissions.module';
import { PermissionsComponent } from './permissions/permissions.component';
import { RequestsComponent } from './requests/requests.component';

const routers: Routes = [
  {
    path: 'permissions',
    component: PermissionsComponent,
    data: {
      title: 'Permissions',
    },
  },
  {
    path: 'requests',
    component: RequestsComponent,
    data: {
      title: 'Requests',
    },
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RequestsModule,
    PermissionsModule,
    RouterModule.forChild(routers),
  ],
})
export class RequestPermissionModule {}
