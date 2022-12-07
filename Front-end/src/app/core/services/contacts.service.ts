import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  Headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
  });

  _contacts$ = new BehaviorSubject<any[]>([]);
  contacts$ = this._contacts$.asObservable();

  _contact$ = new BehaviorSubject<any>({});
  contact$ = this._contact$.asObservable();

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  getContacts() {
    this.spinner.show();
    return this.http.get<any>(`${environment.apiUrl}/contacts`).subscribe({
      next: (res: any) => {
        this._contacts$.next(res);
        this.spinner.hide();
      },
      error: (error) => {
        console.error('There was an error!', error);
        this.spinner.hide();
      },
    });
  }

  getContact(id: string) {
    this.spinner.show();
    return this.http
      .get<any>(`${environment.apiUrl}/contacts/${id}`, {
        headers: this.Headers,
      })
      .pipe()
      .subscribe({
        next: (res: any) => {
          this.getContacts();
          this.spinner.hide();
          this._contact$.next(res);
        },
        error: (error) => {
          console.error('There was an error!', error);
          this.spinner.hide();
        },
      });
  }

  addContact(contact: any) {
    const data = JSON.stringify(contact);
    this.spinner.show();
    return this.http
      .post<any>(`${environment.apiUrl}/contacts`, data, {
        headers: this.Headers,
      })
      .subscribe({
        next: (data) => {
          this.getContacts();
          this.spinner.hide();
          this.toastr.success('Add new contact success', 'Success !');
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
  }

  updateContact(contact: any, id: string) {
    const data = JSON.stringify(contact);
    this.spinner.show();
    return this.http
      .put<any>(`${environment.apiUrl}/contacts/${id}`, data, {
        headers: this.Headers,
      })
      .subscribe({
        next: (data) => {
          this.getContacts();
          this.spinner.hide();
          this.toastr.success('Update contact success', 'Success !');
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
  }

  deleteContact(id: string) {
    this.spinner.show();
    return this.http
      .delete<any>(`${environment.apiUrl}/contacts/${id}`, {
        headers: this.Headers,
      })
      .subscribe({
        next: (data) => {
          this.getContacts();
          this.spinner.hide();
          this.toastr.success('Delete contact success', 'Success !');
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
  }
}
