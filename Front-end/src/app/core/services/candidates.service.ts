import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CandidatesService {
  Headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
  });

  _candidates$ = new BehaviorSubject<any[]>([]);
  candidates$ = this._candidates$.asObservable();

  _candidate$ = new BehaviorSubject<any>({});
  candidate$ = this._candidate$.asObservable();

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  getCandidates() {
    this.spinner.show();
    return this.http.get<any>(`${environment.apiUrl}/candidates`).subscribe({
      next: (res: any) => {
        this._candidates$.next(res);
        this.spinner.hide();
      },
      error: (error) => {
        console.error('There was an error!', error);
        this.spinner.hide();
      },
    });
  }

  getCandidate(id: string) {
    this.spinner.show();
    return this.http
      .get<any>(`${environment.apiUrl}/candidates/${id}`, {
        headers: this.Headers,
      })
      .pipe()
      .subscribe({
        next: (res: any) => {
          this.getCandidates();
          this.spinner.hide();
          this._candidate$.next(res);
        },
        error: (error) => {
          console.error('There was an error!', error);
          this.spinner.hide();
        },
      });
  }

  addCandidate(candidate: any) {
    const data = JSON.stringify(candidate);
    this.spinner.show();
    return this.http
      .post<any>(`${environment.apiUrl}/candidates`, data, {
        headers: this.Headers,
      })
      .subscribe({
        next: (data) => {
          this.getCandidates();
          this.spinner.hide();
          this.toastr.success('Add new candidate success', 'Success !');
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
  }

  updateCandidate(candidate: any, id: string) {
    const data = JSON.stringify(candidate);
    this.spinner.show();
    return this.http
      .put<any>(`${environment.apiUrl}/candidates/${id}`, data, {
        headers: this.Headers,
      })
      .subscribe({
        next: (data) => {
          this.getCandidate(id);
          this.getCandidates();
          this.spinner.hide();
          this.toastr.success('Update candidate success', 'Success !');
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
  }

  deleteCandidate(id: string) {
    this.spinner.show();
    return this.http
      .delete<any>(`${environment.apiUrl}/candidates/${id}`, {
        headers: this.Headers,
      })
      .subscribe({
        next: (data) => {
          this.getCandidates();
          this.spinner.hide();
          this.toastr.success('Delete candidate success', 'Success !');
        },
        error: (error) => {
          console.error('There was an error!', error);
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
      .put<any>(`${environment.apiUrl}/candidates/${id}`, data, {
        headers: this.Headers,
      })
      .pipe()
      .subscribe({
        next: (res: any) => {
          this.getCandidate(id);
          this.getCandidates();
          this.spinner.hide();
          this.toastr.success('Update status successfully!');
        },
        error: (error) => {
          console.error('There was an error!', error);
          this.spinner.hide();
        },
      });
  }
}
