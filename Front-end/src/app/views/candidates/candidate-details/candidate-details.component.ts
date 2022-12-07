import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UploadService } from 'src/app/core/services/upload.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { CandidatesService } from '../../../core/services/candidates.service';
import { DeleteConfirmDialogComponent } from 'src/app/shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { ContactsService } from 'src/app/core/services/contacts.service';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.scss'],
})
export class CandidateDetailsComponent implements OnInit {
  validateFileSize: boolean = false;
  candidateDetail!: any;
  id!: any;
  candidateForm: FormGroup = new FormGroup({});
  url = '';
  public tabIndex = 1;

  selected = 0;
  hovered = 0;
  readonly = true;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private uploadService: UploadService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private candidatesService: CandidatesService,
    private contactService: ContactsService
  ) {}

  ngOnInit(): void {
    this.candidateForm = this.fb.group({
      avatar: [''],
    });

    this.id = this.route.snapshot.paramMap.get('id');

    this.candidatesService.getCandidate(this.id);
    this.candidatesService.candidate$.subscribe((data) => {
      this.candidateDetail = data;
      this.url = data?.avatar;
      console.log(this.candidateDetail);
    });

    this.tabIndex = 0;
    this.uploadService.getAttachment(this.id);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.candidateForm.controls;
  }

  switchTabs(index: number) {
    this.tabIndex = index;
  }

  switchStatus(id: string, status: boolean) {
    this.candidatesService.switchStatus(status, id);
  }

  openDelete(id: any) {
    const data = {
      id: id,
      action: 'Candidate',
    };
    const modalRef = this.modalService.open(DeleteConfirmDialogComponent);
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
            this.candidateForm.patchValue({
              avatar: this.url,
            });
            this.toastr.success('Upload image success!');

            this.contactService.updateContact(
              this.candidateForm.value,
              this.candidateDetail?.contact?._id
            );
            this.spinner.hide();
            this.candidatesService.updateCandidate(
              this.candidateForm.value,
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
}
