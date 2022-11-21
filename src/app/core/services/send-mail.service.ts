import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SendMailService {
  Headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
  });

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  sendEmail(value: any) {
    const data = JSON.stringify(value);

    this.spinner.show();
    return this.http
      .post<any>(`${environment.apiUrl}/send-mail`, data, {
        headers: this.Headers,
      })
      .pipe()
      .subscribe({
        next: (res: any) => {
          this.spinner.hide();
          this.toastr.success('Send mail successfully!');
        },
        error: (error) => {
          console.error('There was an error!', error);
          this.spinner.hide();
        },
      });
  }
}
