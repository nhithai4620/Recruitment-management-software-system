import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ActivitiesService {
  Headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
  });

  _activities$ = new BehaviorSubject<any[]>([]);
  activities$ = this._activities$.asObservable();

  _activity$ = new BehaviorSubject<any>({});
  activity$ = this._activity$.asObservable();

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  getActivities() {
    this.spinner.show();
    return this.http.get<any>(`${environment.apiUrl}/activities`).subscribe({
      next: (res: any) => {
        this._activities$.next(res);
        this.spinner.hide();
      },
      error: (error) => {
        console.error('There was an error!', error);
        this.spinner.hide();
      },
    });
  }

  getActivity(id: string) {
    this.spinner.show();
    return this.http
      .get<any>(`${environment.apiUrl}/activities/${id}`, {
        headers: this.Headers,
      })
      .pipe()
      .subscribe({
        next: (res: any) => {
          this.getActivities();
          this.spinner.hide();
          this._activity$.next(res);
        },
        error: (error) => {
          console.error('There was an error!', error);
          this.spinner.hide();
        },
      });
  }

  addActivity(activity: any) {
    const data = JSON.stringify(activity);
    this.spinner.show();
    return this.http
      .post<any>(`${environment.apiUrl}/activities`, data, {
        headers: this.Headers,
      })
      .subscribe({
        next: (data) => {
          this.getActivities();
          this.spinner.hide();
          this.toastr.success('Add new candidate success', 'Success !');
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
  }

  updateActivity(candidate: any, id: string) {
    const data = JSON.stringify(candidate);
    this.spinner.show();
    return this.http
      .put<any>(`${environment.apiUrl}/activities/${id}`, data, {
        headers: this.Headers,
      })
      .subscribe({
        next: (data) => {
          this.getActivity(id);
          this.getActivities();
          this.spinner.hide();
          this.toastr.success('Update candidate success', 'Success !');
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
  }

  deleteActivity(id: string) {
    this.spinner.show();
    return this.http
      .delete<any>(`${environment.apiUrl}/activities/${id}`, {
        headers: this.Headers,
      })
      .subscribe({
        next: (data) => {
          this.getActivities();
          this.spinner.hide();
          this.toastr.success('Delete activities success', 'Success !');
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
  }
}
