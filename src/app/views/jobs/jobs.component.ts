import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JobRequisitionService } from 'src/app/core/services/job-requisition.service';
import { DeleteConfirmDialogComponent } from 'src/app/shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { AddJobComponent } from './add-job/add-job.component';
import { AssignJobsComponent } from '../../shared/components/assign-jobs/assign-jobs.component';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent implements OnInit {
  requisitionList: any[] = [];
  searchValue: any;
  key: string = 'id';
  reverse: boolean = false;
  p: number = 1;
  itemsPerPage: number = 5;

  constructor(
    private modalService: NgbModal,
    private requisitionService: JobRequisitionService
  ) {}

  ngOnInit(): void {
    this.requisitionService.getRequisition();
    this.requisitionService.requisition$.subscribe((data: any[]) => {
      this.requisitionList = data;
    });
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
      id: id,
      action: 'Job Requisition',
    };
    const modalRef = this.modalService.open(DeleteConfirmDialogComponent);
    modalRef.componentInstance.data = data;
  }

  switchStatus(id: string, status: boolean) {
    this.requisitionService.switchStatus(status, id);
  }
}
