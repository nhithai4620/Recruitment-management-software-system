import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobSummaryComponent } from './job-summary.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../../../shared/shared.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [JobSummaryComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    AngularEditorModule,
  ],
  exports: [JobSummaryComponent],
})
export class JobSummaryModule {}
