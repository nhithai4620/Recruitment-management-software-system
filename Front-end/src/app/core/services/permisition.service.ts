import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  Headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
  });

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  _permission$ = new BehaviorSubject<any[]>([]);
  permission$ = this._permission$.asObservable();

  getPermissions() {
    this.spinner.show();
    return this.http
      .get<any>(`${environment.apiUrl}/admin/list-permission`)
      .pipe()
      .subscribe({
        next: (res: any) => {
          this._permission$.next(res);
          this.spinner.hide();
        },
        error: (error) => {
          console.error('There was an error!', error);
          this.spinner.hide();
        },
      });
  }
}
