import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import CalculateDate from 'src/app/core/utils/caculate-date';
import ValidationMatching from 'src/app/core/utils/vadidation-matching';
import { Observable, Subscription } from 'rxjs';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { JobRequisitionService } from '../../../core/services/job-requisition.service';
import { Permission } from 'src/app/core/models/Permission';
import { RecruitersService } from 'src/app/core/services/recruiters.service';
import { PermissionService } from '../../../core/services/permisition.service';

@Component({
  selector: 'app-add-recruiter',
  templateUrl: './add-recruiter.component.html',
  styleUrls: ['./add-recruiter.component.scss'],
})
export class AddRecruiterComponent implements OnInit {
  @Input() data: any;

  permissionList: any[] = [];

  jobList: any[] = [];

  myDateValue!: Date;

  submitted = false;

  recruiterForm: FormGroup = new FormGroup({});

  action: string = 'Add';

  minDate!: Date;

  maxDate!: Date;

  datePickerOptions = {
    isAnimated: true,
    dateInputFormat: 'DD-MM-YYYY',
    containerClass: 'theme-red',
  };

  dropdownSettings: IDropdownSettings = {};

  selectedItems = [];

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private recruiterService: RecruitersService,
    private permissionService: PermissionService,
    private jobRequisitionService: JobRequisitionService
  ) {}

  ngOnInit(): void {
    this.myDateValue = new Date();
    this.recruiterForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        phone: [''],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        jobTitle: [''],
        dob: [''],
        permission: [''],
        password: ['', [Validators.required, Validators.minLength(6)]],
        conpassword: ['', [Validators.required, Validators.minLength(6)]],
        contactId: [''],
      },
      {
        validators: [
          ValidationMatching.match('password', 'conpassword'),
          CalculateDate.age('dob'),
        ],
      }
    );

    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 80, 0, 1);
    this.maxDate = new Date(currentYear - 12, 0, 1);

    this.permissionService.getPermissions();
    this.permissionService.permission$.subscribe((res: any) => {
      this.permissionList = res;
    });

    this.jobRequisitionService.getRequisitionShort();
    this.jobRequisitionService.requisitionShort$.subscribe((res: any) => {
      this.jobList = res;
    });

    if (this.data) {
      this.selectedItems = this.data?.jobTitle;
      this.action = 'Update';
      this.recruiterForm.patchValue({
        email: this.data.email,
        phone: this.data?.contact?.phone,
        firstName: this.data?.firstName,
        lastName: this.data?.lastName,
        dob: this.data?.dob,
        jobTitle: this.data?.jobTitle._id,
        permission: this.data?.permission?._id,
        contactId: this.data?.contact?._id,
      });
    }

    this.dropdownSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'jobTitle',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true,
    };
  }

  get f(): { [key: string]: AbstractControl } {
    return this.recruiterForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.activeModal.close('Close click');
    if (this.recruiterForm.invalid) {
      return;
    } else {
      delete this.recruiterForm.value.conpassword;
      if (this.data) {
        this.recruiterService.updateRecruiter(
          this.recruiterForm.value,
          this.data?._id
        );
      } else {
        this.recruiterService.addRecruiter(this.recruiterForm.value);
      }

      this.activeModal.close('Close click');
    }
  }
}
