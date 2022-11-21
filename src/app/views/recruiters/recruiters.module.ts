import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecruitersComponent } from './recruiters.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContactModule } from '../../shared/components/contact/contact.module';
import { NoteModule } from '../../shared/components/note/note.module';
import { UpdateContactModule } from '../../shared/components/update-contact/update-contact.module';
import { EmptyDataModule } from '../../shared/components/empty-data/empty-data.module';
import { AddRecruiterComponent } from './add-recruiter/add-recruiter.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { RecruiterDetailsComponent } from './recruiter-details/recruiter-details.component';
import { RecruiterDetailsModule } from './recruiter-details/recruiter-details.module';
import { AddActivitiesModule } from '../activities/add-activities/add-activities.module';

const RecruitersRoutes: Routes = [
  {
    path: '',
    component: RecruitersComponent,
    data: {
      title: 'Recruiters',
    },
  },
  {
    path: ':id',
    component: RecruiterDetailsComponent,
    data: {
      title: 'Recruiter details',
    },
  },
];

@NgModule({
  declarations: [RecruitersComponent, AddRecruiterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(RecruitersRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    OrderModule,
    Ng2SearchPipeModule,
    NgbModule,
    ContactModule,
    NoteModule,
    UpdateContactModule,
    EmptyDataModule,
    NgMultiSelectDropDownModule,
    RecruiterDetailsModule,
    AddActivitiesModule,
  ],
})
export class RecruitersModule {}
