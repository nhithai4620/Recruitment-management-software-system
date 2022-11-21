import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RecruitersService } from 'src/app/core/services/recruiters.service';
import { facebook, linkedin, twitter, website } from 'src/app/core/utils/regex';

@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.component.html',
  styleUrls: ['./update-contact.component.scss'],
})
export class UpdateContactComponent implements OnInit {
  @Input() data: any;
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private recruiterService: RecruitersService,
    public activeModal: NgbActiveModal
  ) {}
  contactForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      contactId: [''],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: [''],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$'),
          Validators.minLength(7),
          Validators.maxLength(13),
        ],
      ],
      website: ['', [Validators.pattern(website)]],
      location: [''],
      facebook: ['', [Validators.pattern(facebook)]],
      linkedin: ['', [Validators.pattern(linkedin)]],
      twitter: ['', [Validators.pattern(twitter)]],
    });

    console.log(this.data);

    this.contactForm.patchValue({
      contactId: this?.data?.contact?._id,
      firstName: this?.data?.firstName,
      lastName: this?.data?.lastName,
      email: this?.data?.contact?.email,
      phone: this?.data?.contact?.phone,
      website: this?.data?.contact?.website,
      location: this?.data?.contact?.location,
      facebook: this?.data?.contact?.facebook,
      linkedin: this?.data?.contact?.linkedin,
      twitter: this?.data?.contact?.twitter,
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.contactForm.controls;
  }

  saveContact() {
    this.activeModal.close('Close click');
    this.recruiterService.updateRecruiter(
      this.contactForm.value,
      this.data._id
    );
  }

  cancelContact() {
    this.contactForm.patchValue({
      email: this?.data?.contact?.email,
      phone: this?.data?.contact?.phone,
      website: this?.data?.contact?.website,
      location: this?.data?.contact?.location,
      facebook: this?.data?.contact?.facebook,
      linkedin: this?.data?.contact?.linkedin,
      twitter: this?.data?.contact?.twitter,
    });
  }
}
