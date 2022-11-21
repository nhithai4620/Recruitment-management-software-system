import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateEvaluateComponent } from './candidate-evaluate.component';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EmptyDataModule } from '../../../../shared/components/empty-data/empty-data.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [CandidateEvaluateComponent],
  imports: [
    CommonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    PdfViewerModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    EmptyDataModule,
    NgbModule,
  ],
  exports: [CandidateEvaluateComponent],
})
export class CandidateEvaluateModule {}
