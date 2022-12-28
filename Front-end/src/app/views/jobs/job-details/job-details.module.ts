import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JobDetailsComponent } from "./job-details.component";
import { MatDividerModule } from "@angular/material/divider";
import { MatTabsModule } from "@angular/material/tabs";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { EmptyDataModule } from "src/app/shared/components/empty-data/empty-data.module";
import { JobSummaryModule } from "./job-summary/job-summary.module";
import { JobNoteModule } from "./job-note/job-note.module";
import { JobReportModule } from "./job-report/job-report.module";
import { JobAttachmentsModule } from "./job-attachments/job-attachments.module";
import { JobCandidatesModule } from "./job-candidates/job-candidates.module";

@NgModule({
  declarations: [JobDetailsComponent],
  imports: [
    CommonModule,
    MatDividerModule,
    MatTabsModule,
    MatIconModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    EmptyDataModule,
    JobSummaryModule,
    EmptyDataModule,
    JobNoteModule,
    JobReportModule,
    JobAttachmentsModule,
    JobCandidatesModule,
  ],
})
export class JobDetailsModule {}
