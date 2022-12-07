import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  submitted = false;

  forgotPassForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.forgotPassForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.minLength(8), Validators.email],
      ],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.forgotPassForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.forgotPassForm.invalid) {
      return;
    } else {
      this.authService.forgotPassword(this.forgotPassForm.value);
    }
  }
}
