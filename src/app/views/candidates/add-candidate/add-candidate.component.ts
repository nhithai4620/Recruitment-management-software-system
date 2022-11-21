import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JobRequisitionService } from 'src/app/core/services/job-requisition.service';
import CalculateDate from 'src/app/core/utils/caculate-date';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CandidatesService } from '../../../core/services/candidates.service';

@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.scss'],
})
export class AddCandidateComponent implements OnInit {
  @Input() data: any;

  jobList: any[] = [];

  submitted = false;

  candidateForm: FormGroup = new FormGroup({});

  action: string = 'Add';

  dropdownSettings: IDropdownSettings = {};

  selectedItems = [];

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private jobRequisitionService: JobRequisitionService,
    private candidateService: CandidatesService
  ) {}

  ngOnInit(): void {
    this.candidateForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        phone: [
          '',
          [
            Validators.required,
            Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$'),
            Validators.minLength(7),
            Validators.maxLength(11),
          ],
        ],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        jobTitle: [''],
        dob: [''],
        GPA: [''],
        experience: [''],
        contactId: [''],
      },
      {
        validators: [CalculateDate.age('dob')],
      }
    );

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
      itemsShowLimit: 2,
      allowSearchFilter: true,
    };

    if (this.data) {
      this.action = 'Update';
      this.candidateForm.patchValue({
        email: this.data?.email,
        phone: this.data?.contact?.phone,
        firstName: this.data?.firstName,
        lastName: this.data?.lastName,
        jobTitle: this.data?.jobTitle,
        dob: this.data?.dob,
        GPA: this.data?.GPA,
        experience: this.data?.experience,
        contactId: this.data?.contact?._id,
      });
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.candidateForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.candidateForm.invalid) {
      return;
    } else {
      if (this.data) {
        console.log(this.candidateForm.value);
        this.activeModal.close('Close click');
        this.candidateService.updateCandidate(
          this.candidateForm.value,
          this.data?._id
        );
      } else {
        this.activeModal.close('Close click');
        this.candidateService.addCandidate(this.candidateForm.value);
      }
    }
  }
}
