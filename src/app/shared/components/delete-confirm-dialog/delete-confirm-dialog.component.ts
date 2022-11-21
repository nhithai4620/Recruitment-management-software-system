import { Component, Injectable, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RecruitersService } from 'src/app/core/services/recruiters.service';
import { JobRequisitionService } from '../../../core/services/job-requisition.service';
import { filter } from 'rxjs/operators';
import { RequestsService } from '../../../core/services/requests.service';
import { Router } from '@angular/router';
import { CandidatesService } from 'src/app/core/services/candidates.service';
import { ContactsService } from '../../../core/services/contacts.service';
@Component({
  selector: 'app-delete-confirm-dialog',
  templateUrl: './delete-confirm-dialog.component.html',
  styleUrls: ['./delete-confirm-dialog.component.scss'],
})
export class DeleteConfirmDialogComponent implements OnInit {
  @Input() data: any;
  constructor(
    private recruitersService: RecruitersService,
    public activeModal: NgbActiveModal,
    private jobRequisitionService: JobRequisitionService,
    private requestsService: RequestsService,
    private candidateService: CandidatesService,
    private contactService: ContactsService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  deleteConfirm() {
    if (this.data.action == 'Request') {
      this.requestsService.deleteRequest(this.data.id);
    } else if (this.data.action == 'Recruiter') {
      this.recruitersService.deleteRecruiter(this.data.id);
      this.router.navigate(['/recruiters']);
    } else if (this.data.action == 'Note') {
      const note = {
        noteId: this.data?.id.note._id,
        note: '',
        owner: 'admin',
      };
      this.recruitersService.addNote(this.data.id._id, note);
    } else if (this.data.action == 'Job Requisition') {
      this.jobRequisitionService.deleteJob(this.data.id);
      this.router.navigate(['/jobs']);
    } else if (this.data.action == 'Candidate') {
      this.candidateService.deleteCandidate(this.data.id);
      this.router.navigate(['/candidates']);
    } else if (this.data.action == 'contact') {
      this.contactService.deleteContact(this.data.id);
      this.router.navigate(['/contacts']);
    } else if (this.data.action == 'Job Requisition Recruiter') {
      const user = {
        jobId: this.data.jobId,
      };

      this.recruitersService.deleteJob(this.data?.recruiterId, user);
      this.router.navigate(['/recruiters']);
    }
    this.activeModal.close('Close click');
  }
}
