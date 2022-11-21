import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignJobsComponent } from './assign-jobs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [AssignJobsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
  ],
  exports: [AssignJobsComponent],
})
export class AssignJobsModule {}
