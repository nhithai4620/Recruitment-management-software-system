import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashBoardService {
  Headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
  });

  _data$ = new BehaviorSubject<any>({});
  data$ = this._data$.asObservable();

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  getData() {
    this.spinner.show();
    return this.http.get<any>(`${environment.apiUrl}/dash-board`).subscribe({
      next: (res: any) => {
        this._data$.next(res);
        this.spinner.hide();
      },
      error: (error) => {
        console.error('There was an error!', error);
        this.spinner.hide();
      },
    });
  }
}
