import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../../../core/services/requests.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteConfirmDialogComponent } from 'src/app/shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { AssignJobsComponent } from 'src/app/shared/components/assign-jobs/assign-jobs.component';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
})
export class RequestsComponent implements OnInit {
  requestList: Request[] = [];
  loading: boolean = false;
  date: Date = new Date();
  searchValue: any;
  key: string = '';
  reverse: boolean = false;
  p: number = 1;
  itemsPerPage: number = 5;

  constructor(
    private requestsService: RequestsService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.requestsService.getRequests();
    this.requestsService.request$.subscribe((data: any[]) => {
      this.requestList = data;
      console.log(this.requestList);
    });
  }

  calculateTime(data: string) {
    const startTime = new Date(data);
    return (this.date.getTime() - startTime.getTime()) / 60000;
  }

  setSort(key: any) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  openDelete(id: string) {
    const data = {
      id: id,
      action: 'Request',
    };
    const modalRef = this.modalService.open(DeleteConfirmDialogComponent);
    modalRef.componentInstance.data = data;
  }

  openAssign(data: any) {
    const modalRef = this.modalService.open(AssignJobsComponent, {
      centered: true,
    });
    modalRef.componentInstance.data = data;
  }

  openPermission(id: string, isApproval: boolean) {
    this.requestsService.updateRequest(isApproval, id);
  }
}
