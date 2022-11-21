import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { RecruitersService } from '../../../core/services/recruiters.service';
import { JobRequisitionService } from '../../../core/services/job-requisition.service';
import { CandidatesService } from '../../../core/services/candidates.service';
import { ActivitiesService } from '../../../core/services/activities.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-add-activities',
  templateUrl: './add-activities.component.html',
  styleUrls: ['./add-activities.component.scss'],
})
export class AddActivitiesComponent implements OnInit {
  submitted: boolean = false;
  activityForm: FormGroup = new FormGroup({});
  required: boolean = !1;
  selectable = true;
  options: string[] = ['One', 'Two', 'Three'];

  public date: Date = new Date();
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;

  htmlContent = '';

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [['bold']],
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    enableToolbar: true,
    showToolbar: true,
  };

  dropdownSettings: IDropdownSettings = {};

  recruiterList!: any[];
  candidateList!: any[];
  selectedItems = [];

  simpleItems = ['Manual URL', 'Google meeting', 'Zoom'];

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private jobRequisitionService: JobRequisitionService,
    private candidatesService: CandidatesService,
    private activitiesService: ActivitiesService
  ) {}

  ngOnInit(): void {
    this.activityForm = this.fb.group({
      title: ['', Validators.required],
      type: ['', Validators.required],
      timeStart: ['', [Validators.required]],
      timeEnd: ['', [Validators.required]],
      location: [''],
      assignees: ['', [Validators.required]],
      attendees: ['', [Validators.required]],
      meetingType: [''],
      link: [''],
      tag: [''],
      description: [''],
    });

    this.jobRequisitionService.getRecruiters();
    this.jobRequisitionService.recuiters$.subscribe((data: any) => {
      this.recruiterList = data;
    });

    this.candidatesService.getCandidates();
    this.candidatesService.candidates$.subscribe((data: any) => {
      this.candidateList = data;
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'email',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
      allowSearchFilter: true,
    };
  }

  get f(): { [key: string]: AbstractControl } {
    return this.activityForm.controls;
  }

  availableColors: any[] = [
    { name: 'none', color: undefined },
    { name: 'Primary', color: 'primary' },
    { name: 'Accent', color: 'accent' },
    { name: 'Warn', color: 'warn' },
  ];

  onSubmit() {
    this.submitted = true;

    if (this.activityForm.invalid) {
      return;
    } else {
      this.activitiesService.addActivity(this.activityForm.value);
      this.activeModal.close('Close click');
    }
  }
}
