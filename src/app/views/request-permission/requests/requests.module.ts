import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsComponent } from './requests.component';
import { Routes, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmptyDataModule } from 'src/app/shared/components/empty-data/empty-data.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AssignJobsModule } from 'src/app/shared/components/assign-jobs/assign-jobs.module';

const router: Routes = [
  {
    path: '',
    component: RequestsComponent,
    data: {
      title: 'Requests',
    },
  },
];

@NgModule({
  declarations: [RequestsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(router),
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    OrderModule,
    Ng2SearchPipeModule,
    NgbModule,
    EmptyDataModule,
    SharedModule,
    AssignJobsModule,
  ],
})
export class RequestsModule {}
