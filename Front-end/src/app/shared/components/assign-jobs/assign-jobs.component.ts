import { Component, Input, OnInit } from '@angular/core';
import { JobRequisitionService } from 'src/app/core/services/job-requisition.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { RecruitersService } from '../../../core/services/recruiters.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-assign-jobs',
  templateUrl: './assign-jobs.component.html',
  styleUrls: ['./assign-jobs.component.scss'],
})
export class AssignJobsComponent implements OnInit {
  @Input() data: any;
  jobList: any[] = [];
  recruiterList: any[] = [];
  action: string = 'Assign';
  dropdownSettings: IDropdownSettings = {};
  selectedItems = [];
  submitted = false;

  assignForm: FormGroup = new FormGroup({});

  constructor(
    private jobRequisitionService: JobRequisitionService,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private recruiterService: RecruitersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.assignForm = this.fb.group({
      recruiter: ['', [Validators.required]],
      jobs: ['', [Validators.required]],
    });

    if (!this.data) {
      this.jobRequisitionService.getRecruiters();
      this.jobRequisitionService.recuiters$.subscribe((res: any) => {
        this.recruiterList = res;
      });
    }

    this.jobRequisitionService.getRequisitionShort();
    this.jobRequisitionService.requisitionShort$.subscribe((res: any) => {
      this.jobList = res;
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'jobTitle',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };

    if (this.data) {
      this.recruiterList.push(this.data);
      this.assignForm.patchValue({
        recruiter: this.data._id,
      });
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.assignForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.assignForm.value);
    if (this.assignForm.invalid) {
      return;
    } else {
      const user = {
        jobTitle: this.assignForm.value.jobs,
      };

      this.recruiterService.updateRecruiter(
        user,
        this.assignForm.value.recruiter
      );

      this.activeModal.close('Close click');
      this.router.navigate(['/recruiters/' + this.assignForm.value.recruiter]);
    }
  }
}
