import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JobRequisitionService {
  Headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
  });

  _requisition$ = new BehaviorSubject<any[]>([]);
  requisition$ = this._requisition$.asObservable();

  _requisitionShort$ = new BehaviorSubject<any[]>([]);
  requisitionShort$ = this._requisitionShort$.asObservable();

  _recuiters$ = new BehaviorSubject<any[]>([]);
  recuiters$ = this._recuiters$.asObservable();

  _job$ = new BehaviorSubject<any>({});
  job$ = this._job$.asObservable();

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  getRequisition() {
    this.spinner.show();
    return this.http.get<any>(`${environment.apiUrl}/requisitions`).subscribe({
      next: (res: any) => {
        this._requisition$.next(res);
        this.spinner.hide();
      },
      error: (error) => {
        console.error('There was an error!', error);
        this.spinner.hide();
      },
    });
  }

  getRequistionDetail(id: string) {
    this.spinner.show();
    return this.http
      .get<any>(`${environment.apiUrl}/requisitions/${id}`, {
        headers: this.Headers,
      })
      .pipe()
      .subscribe({
        next: (res: any) => {
          this.getRecruiters();
          this.spinner.hide();
          this._job$.next(res);
        },
        error: (error) => {
          console.error('There was an error!', error);
          this.spinner.hide();
        },
      });
  }

  getRequisitionShort() {
    this.spinner.show();
    return this.http
      .get<any>(`${environment.apiUrl}/admin/requisitions`)
      .subscribe({
        next: (res: any) => {
          this._requisitionShort$.next(res);
          this.spinner.hide();
        },
        error: (error) => {
          console.error('There was an error!', error);
          this.spinner.hide();
        },
      });
  }

  addRequisition(requisition: any) {
    const data = JSON.stringify(requisition);

    this.spinner.show();
    return this.http
      .post<any>(`${environment.apiUrl}/requisitions`, data, {
        headers: this.Headers,
      })
      .pipe()
      .subscribe({
        next: (res: any) => {
          this.getRequisition();
          this.spinner.hide();
          this.toastr.success('Add new job requisition successfully!');
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
      .put<any>(`${environment.apiUrl}/requisitions/${id}`, data, {
        headers: this.Headers,
      })
      .pipe()
      .subscribe({
        next: (res: any) => {
          this.getRequisition();
          this.getRequistionDetail(id);
          this.spinner.hide();
          this.toastr.success('Update status successfully!');
        },
        error: (error) => {
          console.error('There was an error!', error);
          this.spinner.hide();
        },
      });
  }

  updateJob(job: any, id: string) {
    const data = JSON.stringify(job);

    this.spinner.show();
    return this.http
      .put<any>(`${environment.apiUrl}/requisitions/${id}`, data, {
        headers: this.Headers,
      })
      .pipe()
      .subscribe({
        next: (res: any) => {
          this.getRequistionDetail(id);
          this.getRequisition();
          this.spinner.hide();
          this.toastr.success('Update status successfully!');
        },
        error: (error) => {
          console.error('There was an error!', error);
          this.spinner.hide();
        },
      });
  }

  deleteJob(id: string) {
    this.spinner.show();
    return this.http
      .delete<any>(`${environment.apiUrl}/requisitions/${id}`)
      .pipe()
      .subscribe({
        next: (res: any) => {
          this.getRequisition();
          this.spinner.hide();
          this.toastr.success('Delete job requistion successfully!');
        },
        error: (error) => {
          console.error('There was an error!', error);
          this.spinner.hide();
        },
      });
  }

  getRecruiters() {
    this.spinner.show();
    return this.http
      .get<any>(`${environment.apiUrl}/admin/recruiters-short`)
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
}
