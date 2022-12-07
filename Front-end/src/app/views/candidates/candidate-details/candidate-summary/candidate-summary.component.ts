import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RecruitersService } from 'src/app/core/services/recruiters.service';
import CalculateDate from 'src/app/core/utils/caculate-date';
import { facebook, linkedin, twitter, website } from 'src/app/core/utils/regex';
import { DeleteConfirmDialogComponent } from 'src/app/shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { NoteComponent } from 'src/app/shared/components/note/note.component';
import { CandidatesService } from '../../../../core/services/candidates.service';

@Component({
  selector: 'app-candidate-summary',
  templateUrl: './candidate-summary.component.html',
  styleUrls: ['./candidate-summary.component.scss'],
})
export class CandidateSummaryComponent implements OnInit {
  @Input() details: any;
  detailForm: FormGroup = new FormGroup({});
  contactForm: FormGroup = new FormGroup({});
  date: Date = new Date();
  constructor(
    private fb: FormBuilder,
    private recruiterService: RecruitersService,
    private modalService: NgbModal,
    private candidatesService: CandidatesService
  ) {}

  ngOnInit(): void {
    this.detailForm = this.fb.group(
      {
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
        dob: [''],
        GPA: [''],
        experience: [''],
        contactId: [''],
      },
      {
        validators: [CalculateDate.age('dob')],
      }
    );

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
  }

  ngOnChanges(changes: SimpleChanges) {
    this.detailForm.patchValue({
      firstName: this?.details.firstName,
      lastName: this?.details.lastName,
      dob: this.details?.dob,
      email: this.details?.email,
      phone: this.details?.contact?.phone,
      GPA: this.details?.GPA,
      experience: this.details?.experience,
      contactId: this?.details?._id,
    });

    this.contactForm.patchValue({
      contactId: this?.details?.contact?._id,
      firstName: this?.details.firstName,
      lastName: this?.details.lastName,
      email: this?.details?.contact?.email,
      phone: this?.details?.contact?.phone,
      website: this?.details?.contact?.website,
      location: this?.details?.contact?.location,
      facebook: this?.details?.contact?.facebook,
      linkedin: this?.details?.contact?.linkedin,
      twitter: this?.details?.contact?.twitter,
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.detailForm.controls;
  }

  get f1(): { [key: string]: AbstractControl } {
    return this.contactForm.controls;
  }

  saveDetails() {
    this.candidatesService.updateCandidate(
      this.detailForm.value,
      this.details._id
    );
  }

  cancelDetails() {
    this.detailForm.patchValue({
      firstName: this?.details.firstName,
      lastName: this?.details.lastName,
      dob: this.details?.dob,
      email: this.details?.email,
      phone: this.details?.contact?.phone,
      GPA: this.details?.GPA,
      experience: this.details?.experience,
    });
  }

  saveContact() {
    this.candidatesService.updateCandidate(
      this.contactForm.value,
      this.details._id
    );
  }

  cancelContact() {
    this.contactForm.patchValue({
      email: this?.details?.contact?.email,
      phone: this?.details?.contact?.phone,
      website: this?.details?.contact?.website,
      location: this?.details?.contact?.location,
      facebook: this?.details?.contact?.facebook,
      linkedin: this?.details?.contact?.linkedin,
      twitter: this?.details?.contact?.twitter,
    });
  }

  calculateTime(data: string) {
    const startTime = new Date(data);
    return (this.date.getTime() - startTime.getTime()) / 60000;
  }

  openNote(data: string) {
    const modalRef = this.modalService.open(NoteComponent, {
      centered: true,
      size: 'lg',
    });
    modalRef.componentInstance.data = data;
  }

  openDeleteNote(id: any) {
    const data = {
      id: id,
      action: 'Note',
    };
    const modalRef = this.modalService.open(DeleteConfirmDialogComponent);
    modalRef.componentInstance.data = data;
  }

  switchNoteStatus(data: boolean) {
    const note = {
      noteId: this.details?.note?._id,
      shared: !data,
    };
    this.recruiterService.addNote(this.details._id, note);
  }
}
