import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JobRequisitionService } from 'src/app/core/services/job-requisition.service';
import { NoteComponent } from 'src/app/shared/components/note/note.component';

@Component({
  selector: 'app-job-note',
  templateUrl: './job-note.component.html',
  styleUrls: ['./job-note.component.scss'],
})
export class JobNoteComponent implements OnInit {
  @Input() details: any;
  date: Date = new Date();
  constructor(
    private modalService: NgbModal,
    private jobsService: JobRequisitionService
  ) {}

  ngOnInit(): void {}

  openNote(data: string) {
    const modalRef = this.modalService.open(NoteComponent, {
      centered: true,
      size: 'lg',
    });
    modalRef.componentInstance.data = data;
  }

  switchNoteStatus(data: boolean) {
    const note = {
      noteId: this.details?.note?._id,
      shared: !data,
    };
    this.jobsService.updateJob(note, this.details._id);
  }

  deleteNote() {
    const note = {
      noteId: this.details?.note?._id,
      note: '',
    };
    this.jobsService.updateJob(note, this.details._id);
  }

  calculateTime(data: string) {
    const startTime = new Date(data);
    return (this.date.getTime() - startTime.getTime()) / 60000;
  }
}
