import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { UploadService } from '../../../../core/services/upload.service';

@Component({
  selector: 'app-job-attachments',
  templateUrl: './job-attachments.component.html',
  styleUrls: ['./job-attachments.component.scss'],
})
export class JobAttachmentsComponent implements OnInit {
  @Input() details: any;

  afuConfig: any;

  _base64ToArrayBuffer(base64: any): Uint8Array {
    var binary_string = base64.replace(/\\n/g, '');
    binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer as Uint8Array;
  }

  src: any;

  // src = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';

  constructor(private uploadService: UploadService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.details?._id) {
      this.afuConfig = {
        uploadAPI: {
          url: 'http://localhost:3000/api/v1/uploadFile/upload-file',
          params: {
            id: this.details?._id,
          },
        },
      };

      this.uploadService.getAttachment(this.details._id);

      this.uploadService.attachment$.subscribe((data: any) => {
        this.src = this._base64ToArrayBuffer(data.data);
      });
    }
  }

  deleteAttachment(id: string) {
    this.uploadService.deleteAttachment(id);
  }
}
