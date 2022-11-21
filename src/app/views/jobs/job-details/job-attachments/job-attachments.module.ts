import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobAttachmentsComponent } from './job-attachments.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AngularFileUploaderModule } from 'angular-file-uploader';

@NgModule({
  declarations: [JobAttachmentsComponent],
  imports: [CommonModule, PdfViewerModule, AngularFileUploaderModule],
  exports: [JobAttachmentsComponent],
})
export class JobAttachmentsModule {}
