import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import emailTemplate from '../../template/standard-reply-job-seeker-template';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { UploadService } from 'src/app/core/services/upload.service';
import { SendMailService } from '../../../core/services/send-mail.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  @Input() data: any;

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
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private uploadService: UploadService,
    private sendEmail: SendMailService
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

    this.contactForm.patchValue({
      from: 'administrator@gmail.com',
      to: this.data?.email,
    });

    this.contactForm.get('templates')?.valueChanges.subscribe((x) => {
      this.htmlContent = x;
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.contactForm.controls;
  }

  onSubmit() {
    delete this.contactForm.value.templates;
    this.sendEmail.sendEmail(this.contactForm.value);
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
