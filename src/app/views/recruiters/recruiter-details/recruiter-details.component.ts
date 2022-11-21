import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UploadService } from 'src/app/core/services/upload.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { RecruitersService } from '../../../core/services/recruiters.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JobRequisitionService } from 'src/app/core/services/job-requisition.service';
import { AddJobComponent } from '../../jobs/add-job/add-job.component';
import { AssignJobsComponent } from 'src/app/shared/components/assign-jobs/assign-jobs.component';
import { DeleteConfirmDialogComponent } from 'src/app/shared/components/delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-recruiter-details',
  templateUrl: './recruiter-details.component.html',
  styleUrls: ['./recruiter-details.component.scss'],
})
export class RecruiterDetailsComponent implements OnInit {
  validateFileSize: boolean = false;
  recruiterDetail!: any;
  id!: any;
  recruiterDetailsForm: FormGroup = new FormGroup({});
  url = '';
  public tabIndex = 1;

  constructor(
    private recruiterService: RecruitersService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private uploadService: UploadService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private requisitionService: JobRequisitionService
  ) {}

  ngOnInit(): void {
    this.recruiterDetailsForm = this.fb.group({
      avatar: [''],
    });

    this.id = this.route.snapshot.paramMap.get('id');

    this.recruiterService.getRecruiter(this.id);
    this.recruiterService.recuiter$.subscribe((data) => {
      this.recruiterDetail = data;
      this.url = data.avatar;
    });

    this.tabIndex = 0;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.recruiterDetailsForm.controls;
  }

  openAssign(data: any) {
    const modalRef = this.modalService.open(AssignJobsComponent, {
      centered: true,
    });
    modalRef.componentInstance.data = data;
  }

  onSelectFile(event: Event) {
    const input = event.target as HTMLInputElement;
    this.spinner.show();
    if (input.files && input.files[0]) {
      console.log(input.files[0].size);
      if (input.files[0].size > 5242880) {
        this.validateFileSize = true;
        this.toastr.warning('Image size must be smaller than 5mb');
        this.spinner.hide();
      } else {
        this.uploadService.upLoad(input).subscribe(
          (data: any) => {
            this.url = data.data.url;
            this.recruiterDetailsForm.patchValue({
              avatar: this.url,
            });
            this.toastr.success('Upload image success!');
            this.spinner.hide();
            this.recruiterService.updateRecruiter(
              this.recruiterDetailsForm.value,
              this.id
            );
          },
          (err) => {
            console.log(err);
            this.toastr.error('Upload image failed!');
            this.spinner.hide();
          }
        );
      }
    }
  }

  switchTabs(index: number) {
    this.tabIndex = index;
  }

  switchStatus(id: string, status: boolean) {
    this.recruiterService.switchStatus(status, id);
  }

  openAddJobs(data: any) {
    const modalRef = this.modalService.open(AddJobComponent, {
      centered: true,
      size: 'lg',
    });
    modalRef.componentInstance.data = data;
  }

  openDelete(id: any) {
    const data = {
      id: id,
      action: 'Recruiter',
    };
    const modalRef = this.modalService.open(DeleteConfirmDialogComponent);
    modalRef.componentInstance.data = data;
  }
}
