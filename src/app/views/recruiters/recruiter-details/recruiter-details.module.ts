import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecruiterDetailsComponent } from './recruiter-details.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SummaryModule } from './summary/summary.module';
import { NoteTabModule } from './note-tab/note-tab.module';
import { ContactTabComponent } from './contact-tab/contact-tab.component';
import { ContactTabModule } from './contact-tab/contact-tab.module';
import { EmptyDataModule } from '../../../shared/components/empty-data/empty-data.module';
import { JobsModule } from './jobs/jobs.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [RecruiterDetailsComponent],
  imports: [
    CommonModule,
    MatDividerModule,
    MatTabsModule,
    MatIconModule,
    EmptyDataModule,
    SummaryModule,
    NoteTabModule,
    ContactTabModule,
    JobsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    NgbModule,
  ],
})
export class RecruiterDetailsModule {}
