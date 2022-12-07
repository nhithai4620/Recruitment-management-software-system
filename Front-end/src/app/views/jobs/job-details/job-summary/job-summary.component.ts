import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { DataService } from 'src/app/core/services/data.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NoteComponent } from 'src/app/shared/components/note/note.component';
import { JobRequisitionService } from '../../../../core/services/job-requisition.service';
import { DeleteConfirmDialogComponent } from 'src/app/shared/components/delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-job-summary',
  templateUrl: './job-summary.component.html',
  styleUrls: ['./job-summary.component.scss'],
})
export class JobSummaryComponent implements OnInit {
  @Input() details: any;

  descriptionForm: FormGroup = new FormGroup({});
  requirementsForm: FormGroup = new FormGroup({});
  benefitsForm: FormGroup = new FormGroup({});
  detailForm: FormGroup = new FormGroup({});

  panelOpenState = false;
  date: Date = new Date();

  htmlContent1 = '';
  htmlContent2 = '';
  htmlContent3 = '';

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
    private fb: FormBuilder,
    public dataService: DataService,
    private modalService: NgbModal,
    private jobsService: JobRequisitionService
  ) {}

  ngOnInit(): void {
    this.descriptionForm = this.fb.group({
      content: [''],
    });

    this.benefitsForm = this.fb.group({
      content: [''],
    });

    this.requirementsForm = this.fb.group({
      content: [''],
    });

    this.detailForm = this.fb.group({
      jobTitle: [''],
      jobType: [''],
      jobCategories: [''],
      jobQuantity: [''],
      experience: [''],
      minSalary: ['', [this.checkValidateMin.bind(this)]],
      maxSalary: ['', [this.checkValidateMax.bind(this)]],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.descriptionForm.patchValue({
      content: this.details?.jobDescriptions,
    });

    this.htmlContent1 = this.details?.jobDescriptions;

    this.benefitsForm.patchValue({
      content: this.details?.benefits,
    });

    this.htmlContent2 = this.details?.benefits;

    this.requirementsForm.patchValue({
      content: this.details?.jobRequirements,
    });

    this.htmlContent3 = this.details?.jobRequirements;

    this.detailForm.patchValue({
      jobTitle: this.details?.jobTitle,
      jobType: this.details?.jobType,
      jobCategories: this.details?.jobCategories,
      jobQuantity: this.details?.jobQuantity,
      experience: this.details?.experience,
      minSalary: this.details?.minSalary,
      maxSalary: this.details.maxSalary,
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.descriptionForm.controls;
  }

  get f1(): { [key: string]: AbstractControl } {
    return this.benefitsForm.controls;
  }

  get f2(): { [key: string]: AbstractControl } {
    return this.requirementsForm.controls;
  }

  get f3(): { [key: string]: AbstractControl } {
    return this.detailForm.controls;
  }

  onSaveDescription() {
    const job = {
      jobDescriptions: this.descriptionForm.value.content,
    };
    this.jobsService.updateJob(job, this.details._id);
  }

  onSaveRequirements() {
    const job = {
      jobRequirements: this.requirementsForm.value.content,
    };
    this.jobsService.updateJob(job, this.details._id);
  }

  onSaveBenefits() {
    const job = {
      benefits: this.benefitsForm.value.content,
    };
    this.jobsService.updateJob(job, this.details._id);
  }

  onSaveDetail() {
    this.jobsService.updateJob(this.detailForm.value, this.details._id);
  }

  onCancel() {
    this.descriptionForm.patchValue({
      content: this.details?.jobDescriptions,
    });

    this.benefitsForm.patchValue({
      content: this.details?.benefits,
    });

    this.requirementsForm.patchValue({
      content: this.details?.jobRequirements,
    });

    this.detailForm.patchValue({
      jobTitle: this.details?.jobTitle,
      jobType: this.details?.jobType,
      jobCategories: this.details?.jobCategories,
      jobQuantity: this.details?.jobQuantity,
      experience: this.details?.experience,
      minSalary: this.details?.minSalary,
      maxSalary: this.details.maxSalary,
    });
  }

  openNote(data: string) {
    const modalRef = this.modalService.open(NoteComponent, {
      centered: true,
      size: 'lg',
    });
    modalRef.componentInstance.data = data;
  }

  checkValidateMin(control: FormControl) {
    const value = control.value;
    if (value >= 0) {
      return null;
    } else {
      return { invalidMinValue: true };
    }
  }

  checkValidateMax(control: FormControl) {
    const max = control.value;
    const min = this.detailForm.value?.minSalary;
    if (min <= max) {
      return null;
    } else {
      return { invalidMaxValue: true };
    }
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
