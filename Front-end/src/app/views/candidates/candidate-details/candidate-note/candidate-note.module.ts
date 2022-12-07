import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateNoteComponent } from './candidate-note.component';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  declarations: [CandidateNoteComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    SharedModule,
  ],
  exports: [CandidateNoteComponent],
})
export class CandidateNoteModule {}
