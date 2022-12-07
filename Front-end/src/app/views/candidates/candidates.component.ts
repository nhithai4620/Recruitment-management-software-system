import { Component, OnInit } from '@angular/core';
import { CandidatesService } from '../../core/services/candidates.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCandidateComponent } from './add-candidate/add-candidate.component';
import { DeleteConfirmDialogComponent } from 'src/app/shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { NoteComponent } from 'src/app/shared/components/note/note.component';
import { ContactComponent } from 'src/app/shared/components/contact/contact.component';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss'],
})
export class CandidatesComponent implements OnInit {
  candidateList: any[] = [];
  searchValue: any;
  key: string = 'id';
  reverse: boolean = false;
  p: number = 1;
  itemsPerPage: number = 5;

  view: any = 'List';

  constructor(
    private candidatesService: CandidatesService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.candidatesService.getCandidates();
    this.candidatesService.candidates$.subscribe((data: any[]) => {
      this.candidateList = data;
      console.log(this.candidateList);
    });
  }

  setSort(key: any) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  openAdd(data: any) {
    const modalRef = this.modalService.open(AddCandidateComponent, {
      centered: true,
      size: 'lg',
    });
    modalRef.componentInstance.data = data;
  }

  openDelete(id: any) {
    const data = {
      id: id,
      action: 'Candidate',
    };
    const modalRef = this.modalService.open(DeleteConfirmDialogComponent);
    modalRef.componentInstance.data = data;
  }

  openContact(data: any) {
    const modalRef = this.modalService.open(ContactComponent, {
      centered: true,
      size: 'lg',
    });
    modalRef.componentInstance.data = data;
  }

  openNote(data: string) {
    const modalRef = this.modalService.open(NoteComponent, {
      centered: true,
      size: 'lg',
    });
    modalRef.componentInstance.data = data;
  }

  switchStatus(id: string, status: boolean) {
    this.candidatesService.switchStatus(status, id);
  }
}
