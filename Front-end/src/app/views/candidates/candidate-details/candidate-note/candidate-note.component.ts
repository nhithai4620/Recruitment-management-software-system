import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NoteComponent } from 'src/app/shared/components/note/note.component';
import { CandidatesService } from '../../../../core/services/candidates.service';

@Component({
  selector: 'app-candidate-note',
  templateUrl: './candidate-note.component.html',
  styleUrls: ['./candidate-note.component.scss'],
})
export class CandidateNoteComponent implements OnInit {
  @Input() details: any;
  date: Date = new Date();

  constructor(
    private modalService: NgbModal,
    private candidateService: CandidatesService
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
    this.candidateService.updateCandidate(note, this.details._id);
  }

  deleteNote() {
    const note = {
      noteId: this.details?.note?._id,
      note: '',
    };
    this.candidateService.updateCandidate(note, this.details._id);
  }

  calculateTime(data: string) {
    const startTime = new Date(data);
    return (this.date.getTime() - startTime.getTime()) / 60000;
  }
}
