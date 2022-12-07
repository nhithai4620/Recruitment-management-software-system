import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsComponent } from './jobs.component';
import { AddJobModule } from './add-job/add-job.module';
import { RouterModule, Routes } from '@angular/router';
import { JobDetailsComponent } from './job-details/job-details.component';
import { JobDetailsModule } from './job-details/job-details.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmptyDataModule } from '../../shared/components/empty-data/empty-data.module';
import { AssignJobsModule } from '../../shared/components/assign-jobs/assign-jobs.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

const router: Routes = [
  {
    path: '',
    component: JobsComponent,
    data: {
      title: 'Jobs',
    },
  },
  {
    path: ':id',
    component: JobDetailsComponent,
    data: {
      title: 'Job details',
    },
  },
];

@NgModule({
  declarations: [JobsComponent],
  imports: [
    CommonModule,
    AddJobModule,
    JobDetailsModule,
    RouterModule.forChild(router),
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    OrderModule,
    Ng2SearchPipeModule,
    NgbModule,
    EmptyDataModule,
    AssignJobsModule,
    MatButtonToggleModule,
  ],
  exports: [JobsComponent],
})
export class JobsModule {}
