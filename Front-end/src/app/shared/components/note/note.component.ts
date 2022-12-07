import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { RecruitersService } from '../../../core/services/recruiters.service';
import { JobRequisitionService } from '../../../core/services/job-requisition.service';
import { CandidatesService } from '../../../core/services/candidates.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {
  @Input() data: any;

  sharedChecked: boolean = false;

  action = 'Add';

  submitted = false;

  noteForm: FormGroup = new FormGroup({});

  htmlContent = '';

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '25rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [['bold']],
  };

  constructor(
    public activeModal: NgbActiveModal,
    private recruiterService: RecruitersService,
    private jobsService: JobRequisitionService,
    private candidateService: CandidatesService
  ) {}

  ngOnInit(): void {
    if (this.data?.note) {
      this.htmlContent = this.data?.note?.note;
      this.action = 'Update';
      console.log(this.data);
    }

    this.sharedChecked = this.data?.note?.shared;
  }

  onSubmit() {
    if (this.data.process) {
      const note = {
        noteId: this.data?.note?._id,
        note: this.htmlContent,
        owner: 'admin',
        shared: this.sharedChecked,
      };
      this.candidateService.updateCandidate(note, this.data._id);
    } else if (this.data.email) {
      const note = {
        noteId: this.data?.note?._id,
        note: this.htmlContent,
        owner: 'admin',
        shared: this.sharedChecked,
      };
      this.recruiterService.addNote(this.data._id, note);
    } else if (this.data.jobTitle) {
      const note = {
        noteId: this.data?.note?._id,
        note: this.htmlContent,
        owner: 'admin',
        shared: this.sharedChecked,
      };
      this.jobsService.updateJob(note, this.data._id);
    }

    this.activeModal.dismiss('Cross click');
  }
}
