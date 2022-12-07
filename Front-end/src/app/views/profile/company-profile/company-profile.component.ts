import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UploadService } from 'src/app/core/services/upload.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompanyService } from 'src/app/core/services/company.service';
import { facebook, linkedin, twitter } from '../../../core/utils/regex';
import { DataService } from '../../../core/services/data.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss'],
})
export class CompanyProfileComponent implements OnInit {
  validateFileSize: boolean = false;

  submitted = false;

  profileForm: FormGroup = new FormGroup({});

  url = '';

  constructor(
    private fb: FormBuilder,
    private uploadService: UploadService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private companyService: CompanyService,
    public dataService: DataService
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      companyInfo: this.fb.group({
        logo: ['', []],
        name: ['', [Validators.required]],
        category: ['', [Validators.required]],
        type: ['', [Validators.required]],
        timeZone: [''],
        bio: [''],
      }),
      contactDetails: this.fb.group({
        contactName: ['', [Validators.required]],
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
        website: [''],
        facebook: ['', [Validators.pattern(facebook)]],
        linkedIn: ['', [Validators.pattern(linkedin)]],
        twitter: ['', [Validators.pattern(twitter)]],
      }),
    });

    this.companyService.profile$.subscribe((data) => {
      this.profileForm.patchValue({
        companyInfo: {
          logo: data[0]?.logo,
          name: data[0]?.name,
          category: data[0]?.category,
          type: data[0]?.type,
          timeZone: data[0]?.timeZone,
          bio: data[0]?.bio,
        },
        contactDetails: {
          contactName: data[0]?.contact?.name,
          email: data[0]?.contact?.email,
          phone: data[0]?.contact?.phone,
          website: data[0]?.contact?.website,
          facebook: data[0]?.contact?.facebook,
          linkedIn: data[0]?.contact?.linkedin,
          twitter: data[0]?.contact?.twitter,
        },
      });

      this.url = this.profileForm.value.companyInfo.logo;
    });
  }

  get f1(): { [key: string]: AbstractControl } {
    return (this.profileForm.get('companyInfo') as FormGroup).controls;
  }

  get f2(): { [key: string]: AbstractControl } {
    return (this.profileForm.get('contactDetails') as FormGroup).controls;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.validateFileSize);
    if (this.profileForm.invalid && !this.validateFileSize) {
      return;
    } else {
      console.log(this.profileForm.value);
      this.companyService.updateProfile(this.profileForm.value);
    }
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
            this.profileForm.patchValue({
              companyInfo: {
                logo: data.data.url,
              },
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
