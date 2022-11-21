import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  Headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
  });

  _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this._isLoggedIn$.next(!!this.getAccessToken);
  }

  getAccessToken() {
    return this.cookieService.get('accessToken');
  }

  getRefreshToken() {
    return this.cookieService.get('refreshToken');
  }

  login(email: string, password: string) {
    this.spinner.show();
    let data = {
      username: email,
      password: password,
    };
    console.log(data);
    return this.http
      .post<any>(`${environment.apiUrl}/admin/auth/login`, data, {
        headers: this.Headers,
      })
      .subscribe({
        next: (res) => {
          this.cookieService.set('accessToken', res.accessToken);
          this.cookieService.set('refreshToken', res.refreshToken);
          this._isLoggedIn$.next(true);
          this.toastr.success('Login Success', 'Welcome !');
          this.spinner.hide();
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 1000);
        },
        error: (error) => {
          console.log(error);
          this.spinner.hide();
        },
      });
  }

  logout() {
    this.cookieService.delete('accessToken');
    this.cookieService.delete('refreshToken');
    this._isLoggedIn$.next(false);
    this.router.navigate(['/login']);
  }

  forgotPassword(data: any) {
    this.spinner.show();
    return this.http
      .post<any>(`${environment.apiUrl}/admin/auth/forgot-password`, data, {
        headers: this.Headers,
      })
      .subscribe({
        next: (res) => {
          this.toastr.success('Send email success', 'Please check your email');
          this.spinner.hide();
        },
        error: (error) => {
          console.log(error);
          this.spinner.hide();
        },
      });
  }

  resetPassword(data: any) {
    this.spinner.show();
    return this.http
      .post<any>(`${environment.apiUrl}/admin/auth/reset-password`, data, {
        headers: this.Headers,
      })
      .subscribe({
        next: (res) => {
          this.spinner.hide();
          this.toastr.success('Change Password Success');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.log(error);
          this.spinner.hide();
        },
      });
  }

  refreshToken(token: any) {
    console.log('Service refresh token: ' + token);
    const value = {
      refreshToken: token,
    };

    const data = JSON.stringify(value);

    return this.http.post<any>(
      `${environment.apiUrl}/admin/auth/refresh-token`,
      data,
      { headers: this.Headers }
    );
  }

  //Expired token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMzEyMjYzZTQ2ODVhZjAxODAyZDhjNCIsInVzZXJuYW1lIjoiYWRtaW5pc3RyYXRvckBtYWlsaW5hdG9yLmNvbSIsImlhdCI6MTY2NDcxNDAwMywiZXhwIjoxNjY0NzE3NjAzfQ.b4oXNXo52WDKfH5_d5AsxTaKo_63ODLMiRR6rBVnY2Q
}
