import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RecruitersService } from 'src/app/core/services/recruiters.service';
import { DeleteConfirmDialogComponent } from 'src/app/shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { NoteComponent } from 'src/app/shared/components/note/note.component';

@Component({
  selector: 'app-note-tab',
  templateUrl: './note-tab.component.html',
  styleUrls: ['./note-tab.component.scss'],
})
export class NoteTabComponent implements OnInit {
  @Input() details: any;
  date: Date = new Date();
  constructor(
    private modalService: NgbModal,
    private recruiterService: RecruitersService
  ) {}

  ngOnInit(): void {}

  openNote(data: string) {
    const modalRef = this.modalService.open(NoteComponent, {
      centered: true,
      size: 'lg',
    });
    modalRef.componentInstance.data = data;
  }

  openDeleteNote(id: any) {
    const data = {
      id: id,
      action: 'Note',
    };
    const modalRef = this.modalService.open(DeleteConfirmDialogComponent);
    modalRef.componentInstance.data = data;
  }

  switchNoteStatus(data: boolean) {
    const note = {
      noteId: this.details?.note?._id,
      shared: !data,
    };
    this.recruiterService.addNote(this.details._id, note);
  }

  calculateTime(data: string) {
    const startTime = new Date(data);
    return (this.date.getTime() - startTime.getTime()) / 60000;
  }
}
