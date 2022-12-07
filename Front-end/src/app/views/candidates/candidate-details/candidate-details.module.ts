import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateDetailsComponent } from './candidate-details.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EmptyDataModule } from '../../../shared/components/empty-data/empty-data.module';
import { CandidateSummaryModule } from './candidate-summary/candidate-summary.module';
import { CvModule } from './cv/cv.module';
import { CandidateNoteModule } from './candidate-note/candidate-note.module';
import { CandidateReportModule } from './candidate-report/candidate-report.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CandidateEvaluateModule } from './candidate-evaluate/candidate-evaluate.module';

@NgModule({
  declarations: [CandidateDetailsComponent],
  imports: [
    CommonModule,
    MatDividerModule,
    MatTabsModule,
    MatIconModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    EmptyDataModule,
    CandidateSummaryModule,
    CvModule,
    CandidateNoteModule,
    CandidateReportModule,
    CandidateEvaluateModule,
    NgbModule,
  ],
})
export class CandidateDetailsModule {}
