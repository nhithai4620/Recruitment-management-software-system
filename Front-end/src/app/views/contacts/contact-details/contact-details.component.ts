import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ContactsService } from "src/app/core/services/contacts.service";
import emailTemplate from "src/app/shared/template/standard-reply-job-seeker-template";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { UploadService } from "src/app/core/services/upload.service";
import { SendMailService } from "src/app/core/services/send-mail.service";
import { AddContactComponent } from "../add-contact/add-contact.component";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-contact-details",
  templateUrl: "./contact-details.component.html",
  styleUrls: ["./contact-details.component.scss"],
})
export class ContactDetailsComponent implements OnInit {
  contactDetail: any;

  id: any;

  people: string = "Hiring manager";

  validateFileSize: boolean = false;

  submitted = false;

  contactForm: FormGroup = new FormGroup({});

  htmlContent = "";

  emailTemplates = emailTemplate;

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "15rem",
    minHeight: "5rem",
    placeholder: "Enter text here...",
    translate: "no",
    defaultParagraphSeparator: "p",
    defaultFontName: "Arial",
    toolbarHiddenButtons: [["bold"]],
    fonts: [
      { class: "arial", name: "Arial" },
      { class: "times-new-roman", name: "Times New Roman" },
      { class: "calibri", name: "Calibri" },
      { class: "comic-sans-ms", name: "Comic Sans MS" },
    ],
    enableToolbar: true,
    showToolbar: true,
  };

  constructor(
    private contactService: ContactsService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private uploadService: UploadService,
    private sendEmail: SendMailService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");

    this.contactService.getContact(this.id);
    this.contactService.contact$.subscribe((data: any) => {
      this.contactDetail = data;
      this.contactForm.patchValue({
        to: this.contactDetail?.email,
      });
    });

    this.contactForm = this.fb.group({
      templates: [""],
      from: [
        "administrator@gmail.com",
        [Validators.required, Validators.minLength(8), Validators.email],
      ],
      to: [
        "",
        [Validators.required, Validators.minLength(8), Validators.email],
      ],
      title: ["", [Validators.required]],
      content: ["", [Validators.required]],
      document: [""],
    });

    this.contactForm.get("templates")?.valueChanges.subscribe((x) => {
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

  openAdd(data: any) {
    const modalRef = this.modalService.open(AddContactComponent, {
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
        this.toastr.warning("Image size must be smaller than 5mb");
        this.spinner.hide();
      } else {
        this.uploadService.upLoadNonMediaFile(input).subscribe(
          (data: any) => {
            this.contactForm.patchValue({
              document: data.data.url,
            });
            this.toastr.success("Upload image success!");
            this.spinner.hide();
          },
          (err) => {
            console.log(err);
            this.toastr.error("Upload image failed!");
            this.spinner.hide();
          }
        );
      }
    }
  }
}
