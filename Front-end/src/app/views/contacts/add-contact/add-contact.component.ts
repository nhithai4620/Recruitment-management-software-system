import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { facebook, linkedin, twitter, website } from 'src/app/core/utils/regex';
import { DeleteConfirmDialogComponent } from 'src/app/shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { ContactsService } from '../../../core/services/contacts.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss'],
})
export class AddContactComponent implements OnInit {
  @Input() data: any;
  submitted = false;
  contactForm: FormGroup = new FormGroup({});
  action: string = 'Add';

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private contactService: ContactsService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
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
      website: ['', [Validators.pattern(website)]],
      location: [''],
      facebook: ['', [Validators.pattern(facebook)]],
      linkedin: ['', [Validators.pattern(linkedin)]],
      twitter: ['', [Validators.pattern(twitter)]],
    });

    if (this.data) {
      this.contactForm.patchValue({
        name: this?.data.name,
        email: this?.data?.email,
        phone: this?.data?.phone,
        website: this?.data?.website,
        location: this?.data?.location,
        facebook: this?.data?.facebook,
        linkedin: this?.data?.linkedin,
        twitter: this?.data?.twitter,
      });
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.contactForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.contactForm.invalid) {
      return;
    } else {
      if (this.data) {
        this.activeModal.close('Close click');
        this.contactService.updateContact(
          this.contactForm.value,
          this.data._id
        );
      } else {
        this.activeModal.close('Close click');
        this.contactService.addContact(this.contactForm.value);
      }
    }
  }
}
