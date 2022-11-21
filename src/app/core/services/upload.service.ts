import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  Headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
  });

  constructor(
    private httpClient: HttpClient,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  _attachment$ = new BehaviorSubject<any>({});
  attachment$ = this._attachment$.asObservable();

  upLoad(inputFile: any): Observable<any> {
    var fd = new FormData();
    fd.append('image', inputFile.files[0], '[PROXY]');
    return this.httpClient
      .post<any>(`${environment.apiUrl}/upload/cloudinary-image`, fd)
      .pipe();
  }

  upLoadNonMediaFile(inputFile: any): Observable<any> {
    var fd = new FormData();
    fd.append('image', inputFile.files[0], '[PROXY]');
    return this.httpClient
      .post<any>(`${environment.apiUrl}/upload/cloudinary-file`, fd)
      .pipe();
  }

  getAttachment(id: string) {
    if (id) {
      return this.http
        .get<any>(`${environment.apiUrl}/uploadFile/get-file/${id}`, {
          headers: this.Headers,
        })
        .pipe()
        .subscribe({
          next: (res: any) => {
            this._attachment$.next(res);
          },
          error: (error) => {
            console.error('There was an error!', error);
          },
        });
    } else {
      return;
    }
  }

  deleteAttachment(id: string) {
    if (id) {
      return this.http
        .delete<any>(`${environment.apiUrl}/uploadFile/delete-file/${id}`, {
          headers: this.Headers,
        })
        .pipe()
        .subscribe({
          next: (res: any) => {
            this.getAttachment(id);
            this.toastr.success('Delete attachment Success', 'Success !');
          },
          error: (error) => {
            console.error('There was an error!', error);
          },
        });
    } else {
      return;
    }
  }
}
