import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  _profile$ = new BehaviorSubject<any>({});
  profile$ = this._profile$.asObservable();

  getProfile() {
    this.spinner.show();
    return this.http
      .get<any>(`${environment.apiUrl}/admin/profile`)
      .pipe()
      .subscribe({
        next: (res: any) => {
          this._profile$.next(res);
          this.spinner.hide();
        },
        error: (error) => {
          console.error('There was an error!', error);
          this.spinner.hide();
        },
      });
  }

  updateProfile(data: any) {
    data.contactDetails.name = data.contactDetails.contactName;
    delete data.contactDetails.contactName;
    this.spinner.show();

    return this.http
      .post<any>(`${environment.apiUrl}/admin/update-profile`, data)
      .pipe()
      .subscribe({
        next: (res: any) => {
          this.getProfile();
          this.spinner.hide();
          this.toastr.success('Update profile Success', 'Success !');
        },
        error: (error) => {
          console.error('There was an error!', error);
          this.spinner.hide();
          this.toastr.error('Update profile failed');
        },
      });
  }
}
