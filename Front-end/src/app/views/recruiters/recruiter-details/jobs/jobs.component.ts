import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobRequisitionService } from 'src/app/core/services/job-requisition.service';
import { RecruitersService } from '../../../../core/services/recruiters.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AssignJobsComponent } from 'src/app/shared/components/assign-jobs/assign-jobs.component';
import { DeleteConfirmDialogComponent } from 'src/app/shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { AddJobComponent } from 'src/app/views/jobs/add-job/add-job.component';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent implements OnInit {
  @Input() details: any;

  requisitionList: any[] = [];
  searchValue: any;
  key: string = 'id';
  reverse: boolean = false;
  p: number = 1;
  itemsPerPage: number = 5;

  constructor(
    private requisitionService: JobRequisitionService,
    private recruiterService: RecruitersService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    // this.recruiterService.recuiter$.subscribe((data: any) => {
    //   this.details = data;
    //   this.requisitionList = data?.jobTitle;
    //   console.log(this.details);
    // });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.requisitionList = this.details?.jobTitle;
  }

  setSort(key: any) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  openAdd(data: any) {
    const modalRef = this.modalService.open(AddJobComponent, {
      centered: true,
      size: 'lg',
    });
    modalRef.componentInstance.data = data;
  }

  openAssign(data: any) {
    const modalRef = this.modalService.open(AssignJobsComponent, {
      centered: true,
    });
    modalRef.componentInstance.data = data;
  }

  openDelete(id: any) {
    const data = {
      recruiterId: this.details?._id,
      jobId: id,
      action: 'Job Requisition Recruiter',
    };

    const modalRef = this.modalService.open(DeleteConfirmDialogComponent);
    modalRef.componentInstance.data = data;
  }

  switchStatus(id: string, status: boolean) {
    this.requisitionService.switchStatus(status, id);
  }
}
