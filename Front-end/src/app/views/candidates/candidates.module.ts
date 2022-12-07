import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidatesComponent } from './candidates.component';
import { RouterModule, Routes } from '@angular/router';
import { CandidateDetailsComponent } from './candidate-details/candidate-details.component';
import { EmptyDataModule } from '../../shared/components/empty-data/empty-data.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddCandidateModule } from './add-candidate/add-candidate.module';
import { CandidateDetailsModule } from './candidate-details/candidate-details.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [
  {
    path: '',
    component: CandidatesComponent,
    data: {
      title: 'Recruiters',
    },
  },
  {
    path: ':id',
    component: CandidateDetailsComponent,
    data: {
      title: 'Recruiter details',
    },
  },
];

@NgModule({
  declarations: [CandidatesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EmptyDataModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    OrderModule,
    Ng2SearchPipeModule,
    NgbModule,
    AddCandidateModule,
    CandidateDetailsModule,
    MatButtonToggleModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
  ],
})
export class CandidatesModule {}
