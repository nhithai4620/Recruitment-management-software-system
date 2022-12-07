import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/core/services/data.service';
import { JobRequisitionService } from 'src/app/core/services/job-requisition.service';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss'],
})
export class AddJobComponent implements OnInit {
  @Input() data: any;

  submitted = false;

  requisitionForm: FormGroup = new FormGroup({});

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '20rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [['bold']],
  };

  action: string = 'Add';

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private jobRequisitionService: JobRequisitionService,
    public dataService: DataService
  ) {}

  ngOnInit(): void {
    this.requisitionForm = this.fb.group({
      jobTitle: ['', [Validators.required]],
      jobType: ['', [Validators.required]],
      jobCategories: ['', [Validators.required]],
      jobQuantity: [''],
      jobDescriptions: [''],
      jobRequirements: [''],
      benefits: [''],
      experience: [''],
      minSalary: ['', [this.checkValidateMin.bind(this)]],
      maxSalary: ['', [this.checkValidateMax.bind(this)]],
    });

    if (this.data) {
      console.log(this.data);
      this.action = 'Update';
      this.requisitionForm.patchValue({
        jobTitle: this.data?.jobTitle,
        jobType: this.data?.jobType,
        jobCategories: this.data?.jobCategories,
        jobQuantity: this.data?.jobQuantity,
        jobDescriptions: this.data?.jobDescriptions,
        jobRequirements: this.data?.jobRequirements,
        benefits: this.data?.benefits,
        experience: this.data?.experience,
        minSalary: this.data?.minSalary,
        maxSalary: this.data?.maxSalary,
      });
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.requisitionForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.activeModal.close('Close click');
    if (this.requisitionForm.invalid) {
      return;
    } else {
      if (this.data) {
        this.jobRequisitionService.updateJob(
          this.requisitionForm.value,
          this.data?._id
        );
      } else {
        this.jobRequisitionService.addRequisition(this.requisitionForm.value);
      }
    }
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
    const min = this.requisitionForm.value?.minSalary;
    if (min <= max) {
      return null;
    } else {
      return { invalidMaxValue: true };
    }
  }
}
