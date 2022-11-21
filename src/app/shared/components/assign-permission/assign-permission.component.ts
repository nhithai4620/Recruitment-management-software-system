import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RecruitersService } from '../../../core/services/recruiters.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { JobRequisitionService } from 'src/app/core/services/job-requisition.service';
import { PermissionService } from 'src/app/core/services/permisition.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assign-permission',
  templateUrl: './assign-permission.component.html',
  styleUrls: ['./assign-permission.component.scss'],
})
export class AssignPermissionComponent implements OnInit {
  @Input() data: any;
  recruiterList: any[] = [];
  permissionList: any[] = [];
  assignForm: FormGroup = new FormGroup({});
  submitted = false;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private recruiterService: RecruitersService,
    private jobRequisitionService: JobRequisitionService,
    private permissionService: PermissionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.data) {
      this.jobRequisitionService.getRecruiters();
      this.jobRequisitionService.recuiters$.subscribe((res: any) => {
        this.recruiterList = res;
      });
    }

    this.permissionService.getPermissions();
    this.permissionService.permission$.subscribe((res: any) => {
      this.permissionList = res;
    });

    this.assignForm = this.fb.group({
      recruiter: ['', [Validators.required]],
      permission: ['', [Validators.required]],
    });

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
    if (this.assignForm.invalid) {
      return;
    } else {
      const user = {
        permission: this.assignForm.value.permission,
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
