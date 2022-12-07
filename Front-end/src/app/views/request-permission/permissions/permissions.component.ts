import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AssignPermissionComponent } from '../../../shared/components/assign-permission/assign-permission.component';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss'],
})
export class PermissionsComponent implements OnInit {
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  openAssign(data: any) {
    const modalRef = this.modalService.open(AssignPermissionComponent, {
      centered: true,
    });
    modalRef.componentInstance.data = data;
  }
}
