import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import ValidationMatching from 'src/app/core/utils/vadidation-matching';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  submitted = false;

  resetPassForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.resetPassForm = this.fb.group(
      {
        token: ['', [Validators.required]],
        userId: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirm_password: ['', [Validators.required, Validators.minLength(6)]],
      },
      {
        validators: [ValidationMatching.match('password', 'confirm_password')],
      }
    );

    this.route.queryParamMap.subscribe((params) => {
      const token = params.get('token');
      const userId = params.get('id');
      this.resetPassForm.patchValue({
        token: token,
        userId: userId,
      });
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.resetPassForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (
      this.resetPassForm.get('token')?.invalid ||
      this.resetPassForm.get('userId')?.invalid
    ) {
      this.toastr.warning(
        'Please click the link in your email',
        'Check your email'
      );
    } else if (this.resetPassForm.invalid) {
      return;
    } else {
      delete this.resetPassForm.value.confirm_password;
      console.log(this.resetPassForm.value);
      this.authService.resetPassword(this.resetPassForm.value);
    }
  }
}
