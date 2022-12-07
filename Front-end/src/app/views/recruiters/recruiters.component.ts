import { Component, OnInit } from '@angular/core';
import { User } from '../../core/models/User';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RecruitersService } from 'src/app/core/services/recruiters.service';
import { NoteComponent } from 'src/app/shared/components/note/note.component';
import { DeleteConfirmDialogComponent } from '../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { ContactComponent } from 'src/app/shared/components/contact/contact.component';
import { AddRecruiterComponent } from './add-recruiter/add-recruiter.component';
import { AssignJobsComponent } from 'src/app/shared/components/assign-jobs/assign-jobs.component';
import { AssignPermissionComponent } from '../../shared/components/assign-permission/assign-permission.component';

@Component({
  selector: 'app-recruiters',
  templateUrl: './recruiters.component.html',
  styleUrls: ['./recruiters.component.scss'],
})
export class RecruitersComponent implements OnInit {
  recruiterList: any[] = [];
  loading: boolean = false;
  searchValue: any;
  key: string = 'id';
  reverse: boolean = false;
  p: number = 1;
  itemsPerPage: number = 5;

  view: any = 'List';

  constructor(
    private recuiterService: RecruitersService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.recuiterService.getRecruiters();
    this.recuiterService.recuiters$.subscribe((data: any[]) => {
      this.recruiterList = data;
      console.log(this.recruiterList);
    });
  }

  setSort(key: any) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  openNote(data: any) {
    const modalRef = this.modalService.open(NoteComponent, {
      centered: true,
      size: 'lg',
    });
    modalRef.componentInstance.data = data;
  }
  openContact(data: any) {
    const modalRef = this.modalService.open(ContactComponent, {
      centered: true,
      size: 'lg',
    });
    modalRef.componentInstance.data = data;
  }

  openAdd(data: any) {
    const modalRef = this.modalService.open(AddRecruiterComponent, {
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

  openAssign(data: any) {
    const modalRef = this.modalService.open(AssignJobsComponent, {
      centered: true,
    });
    modalRef.componentInstance.data = data;
  }

  openAssignPermission(data: any) {
    const modalRef = this.modalService.open(AssignPermissionComponent, {
      centered: true,
    });
    modalRef.componentInstance.data = data;
  }

  switchStatus(id: any, status: any) {
    this.recuiterService.switchStatus(status, id);
  }
}
