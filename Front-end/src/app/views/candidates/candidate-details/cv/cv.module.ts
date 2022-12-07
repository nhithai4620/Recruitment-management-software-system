import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvComponent } from './cv.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AngularFileUploaderModule } from 'angular-file-uploader';

@NgModule({
  declarations: [CvComponent],
  imports: [CommonModule, PdfViewerModule, AngularFileUploaderModule],
  exports: [CvComponent],
})
export class CvModule {}
