import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../../core/services/contacts.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddContactComponent } from './add-contact/add-contact.component';
import { DeleteConfirmDialogComponent } from 'src/app/shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { ContactComponent } from 'src/app/shared/components/contact/contact.component';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  contactList: any[] = [];
  searchValue: any;
  key: string = 'id';
  reverse: boolean = false;
  p: number = 1;
  itemsPerPage: number = 5;

  view: any = 'List';

  constructor(
    private contactsService: ContactsService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.contactsService.getContacts();
    this.contactsService.contacts$.subscribe((data: any) => {
      this.contactList = data;
    });

    console.log(this.view);
  }

  setSort(key: any) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  openAdd(data: any) {
    const modalRef = this.modalService.open(AddContactComponent, {
      centered: true,
    });
    modalRef.componentInstance.data = data;
  }

  openDelete(id: any) {
    const data = {
      id: id,
      action: 'contact',
    };
    const modalRef = this.modalService.open(DeleteConfirmDialogComponent);
    modalRef.componentInstance.data = data;
  }

  openContact(data: any) {
    const modalRef = this.modalService.open(ContactComponent, {
      centered: true,
      size: 'lg',
    });
    modalRef.componentInstance.data = data;
  }
}
