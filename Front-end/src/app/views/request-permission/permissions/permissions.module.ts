import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsComponent } from './permissions.component';
import { Routes, RouterModule } from '@angular/router';
import { AssignPermissionModule } from '../../../shared/components/assign-permission/assign-permission.module';

const routers: Routes = [
  {
    path: '',
    component: PermissionsComponent,
    data: {
      title: 'Permissions',
    },
  },
];

@NgModule({
  declarations: [PermissionsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routers),
    AssignPermissionModule,
  ],
})
export class PermissionsModule {}
