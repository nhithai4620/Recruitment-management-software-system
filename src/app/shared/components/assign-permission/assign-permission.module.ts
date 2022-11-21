import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignPermissionComponent } from './assign-permission.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AssignPermissionComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [AssignPermissionComponent],
})
export class AssignPermissionModule {}
