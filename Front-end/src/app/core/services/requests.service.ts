import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  Headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
  });

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  _request$ = new BehaviorSubject<any[]>([]);
  request$ = this._request$.asObservable();

  getRequests() {
    this.spinner.show();
    return this.http
      .get<any>(`${environment.apiUrl}/admin/requests`)
      .pipe()
      .subscribe({
        next: (res: any) => {
          this._request$.next(res);
          this.spinner.hide();
        },
        error: (error) => {
          console.error('There was an error!', error);
          this.spinner.hide();
        },
      });
  }

  deleteRequest(id: string) {
    this.spinner.show();
    return this.http
      .delete<any>(`${environment.apiUrl}/admin/requests/${id}`)
      .pipe()
      .subscribe({
        next: (res: any) => {
          this.getRequests();
          this.spinner.hide();
          this.toastr.success('Delete request successfully!');
        },
        error: (error) => {
          console.error('There was an error!', error);
          this.spinner.hide();
        },
      });
  }

  updateRequest(request: boolean, _id: string) {
    const value = {
      is_approval: !request,
    };

    const data = JSON.stringify(value);

    this.spinner.show();
    return this.http
      .put<any>(`${environment.apiUrl}/admin/requests/${_id}`, data, {
        headers: this.Headers,
      })
      .pipe()
      .subscribe({
        next: (res: any) => {
          this.getRequests();
          this.spinner.hide();
          this.toastr.success('Update request successfully!');
        },
        error: (error) => {
          console.error('There was an error!', error);
          this.spinner.hide();
        },
      });
  }
}
