import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { UploadService } from 'src/app/core/services/upload.service';
import emailTemplate from 'src/app/shared/template/standard-reply-job-seeker-template';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SendMailService } from 'src/app/core/services/send-mail.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateContactComponent } from '../../../../shared/components/update-contact/update-contact.component';

@Component({
  selector: 'app-contact-tab',
  templateUrl: './contact-tab.component.html',
  styleUrls: ['./contact-tab.component.scss'],
})
export class ContactTabComponent implements OnInit {
  @Input() details: any;

  people: string = 'Hiring manager';

  validateFileSize: boolean = false;

  submitted = false;

  contactForm: FormGroup = new FormGroup({});

  htmlContent = '';

  emailTemplates = emailTemplate;

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [['bold']],
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    enableToolbar: true,
    showToolbar: true,
  };

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private uploadService: UploadService,
    private sendEmail: SendMailService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      templates: [''],
      from: [
        '',
        [Validators.required, Validators.minLength(8), Validators.email],
      ],
      to: [
        '',
        [Validators.required, Validators.minLength(8), Validators.email],
      ],
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      document: [''],
    });

    this.contactForm.get('templates')?.valueChanges.subscribe((x) => {
      this.htmlContent = x;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.contactForm.patchValue({
      from: 'administrator@mailinator.com',
      to: this.details.contact?.email,
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.contactForm.controls;
  }

  onSubmit() {
    delete this.contactForm.value.templates;
    this.sendEmail.sendEmail(this.contactForm.value);
  }

  openUpdateContact(data: string) {
    const modalRef = this.modalService.open(UpdateContactComponent, {
      centered: true,
    });
    modalRef.componentInstance.data = data;
  }

  onSelectFile(event: Event) {
    const input = event.target as HTMLInputElement;
    this.spinner.show();
    if (input.files && input.files[0]) {
      if (input.files[0].size > 5242880) {
        this.validateFileSize = true;
        this.toastr.warning('Image size must be smaller than 5mb');
        this.spinner.hide();
      } else {
        this.uploadService.upLoadNonMediaFile(input).subscribe(
          (data: any) => {
            this.contactForm.patchValue({
              document: data.data.url,
            });
            this.toastr.success('Upload image success!');
            this.spinner.hide();
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
