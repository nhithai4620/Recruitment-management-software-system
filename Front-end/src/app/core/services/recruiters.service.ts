import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecruitersService {
  Headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
  });

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  _recuiters$ = new BehaviorSubject<any[]>([]);
  recuiters$ = this._recuiters$.asObservable();

  _recuiter$ = new BehaviorSubject<any>({});
  recuiter$ = this._recuiter$.asObservable();

  getRecruiters() {
    this.spinner.show();
    return this.http
      .get<any>(`${environment.apiUrl}/admin/recruiters`)
      .pipe()
      .subscribe({
        next: (res: any) => {
          this._recuiters$.next(res);
          this.spinner.hide();
        },
        error: (error) => {
          console.error('There was an error!', error);
          this.spinner.hide();
        },
      });
  }

  addRecruiter(user: any) {
    const data = JSON.stringify(user);
    this.spinner.show();
    return this.http
      .post<any>(`${environment.apiUrl}/admin/recruiters`, data, {
        headers: this.Headers,
      })
      .subscribe({
        next: (data) => {
          this.getRecruiters();
          this.spinner.hide();
          this.toastr.success('Add new recruiter Success', 'Success !');
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
  }

  addNote(id: string, value: any) {
    const data = JSON.stringify(value);

    this.spinner.show();
    return this.http
      .put<any>(`${environment.apiUrl}/admin/recruiters/${id}`, data, {
        headers: this.Headers,
      })
      .pipe()
      .subscribe({
        next: (res: any) => {
          this.getRecruiters();
          this.getRecruiter(id);
          this.spinner.hide();
          this.toastr.success('Add note successfully!');
        },
        error: (error) => {
          console.error('There was an error!', error);
          this.spinner.hide();
        },
      });
  }

  switchStatus(isActive: boolean, id: string) {
    const value = {
      is_active: !isActive,
    };

    const data = JSON.stringify(value);

    this.spinner.show();
    return this.http
      .put<any>(`${environment.apiUrl}/admin/recruiters/${id}`, data, {
        headers: this.Headers,
      })
      .pipe()
      .subscribe({
        next: (res: any) => {
          this.getRecruiters();
          this.getRecruiter(id);
          this.spinner.hide();
          this.toastr.success('Update status successfully!');
        },
        error: (error) => {
          console.error('There was an error!', error);
          this.spinner.hide();
        },
      });
  }

  updateRecruiter(user: any, id: string) {
    const data = JSON.stringify(user);
    this.spinner.show();
    return this.http
      .put<any>(`${environment.apiUrl}/admin/recruiters/${id}`, data, {
        headers: this.Headers,
      })
      .pipe()
      .subscribe({
        next: (res: any) => {
          this.getRecruiters();
          this.getRecruiter(id);
          this.spinner.hide();
          this.toastr.success('Update recruiter successfully!');
        },
        error: (error) => {
          console.error('There was an error!', error);
          this.spinner.hide();
        },
      });
  }

  deleteJob(id: string, jobId: any) {
    this.spinner.show();
    return this.http
      .put<any>(`${environment.apiUrl}/admin/recruiters-job/${id}`, jobId, {
        headers: this.Headers,
      })
      .pipe()
      .subscribe({
        next: (res: any) => {
          this.getRecruiter(id);
          this.spinner.hide();
          this.toastr.success('Delete job successfully!');
        },
        error: (error) => {
          console.error('There was an error!', error);
          this.spinner.hide();
        },
      });
  }

  deleteRecruiter(id: string) {
    this.spinner.show();
    return this.http
      .delete<any>(`${environment.apiUrl}/admin/recruiters/${id}`, {
        headers: this.Headers,
      })
      .pipe()
      .subscribe({
        next: (res: any) => {
          this.getRecruiters();
          this.spinner.hide();
          this.toastr.success('Delete recruiter successfully!');
        },
        error: (error) => {
          console.error('There was an error!', error);
          this.spinner.hide();
        },
      });
  }

  getRecruiter(id: string) {
    this.spinner.show();
    return this.http
      .get<any>(`${environment.apiUrl}/admin/recruiters/${id}`, {
        headers: this.Headers,
      })
      .pipe()
      .subscribe({
        next: (res: any) => {
          this.getRecruiters();
          this.spinner.hide();
          this._recuiter$.next(res);
        },
        error: (error) => {
          console.error('There was an error!', error);
          this.spinner.hide();
        },
      });
  }
}
