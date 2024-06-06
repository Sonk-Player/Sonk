import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { User, AuthStatus, LoginResponse, CheckTokenResponse, RegisterResponse } from '../models/interfaces';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'

})
export class AuthService {

  private readonly baseUrl: string = environment.AUTH;
  private http = inject(HttpClient);

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);
  private user :User | null = null;

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor(
    private cookieService: CookieService
  ) {

  }

  private setAuthenticated(user: User, token: string): boolean {
    this._currentUser.set(user);
    this.user = user;
    this._authStatus.set(AuthStatus.authenticated);
    this.cookieService.set('token', token, {
      path: '/',
      expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7)
    });
    this.cookieService.set('userId', user._id, {
      path: '/',
      expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7)
    });
    return true;
  }

  get getCurrentuser () : User | null {
    return this.user;
  }

  login(email: string, password: string): Observable<boolean> {

    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password };

    return this.http.post<RegisterResponse>(url, body)
      .pipe(
        map(({ user, token }) => this.setAuthenticated(user, token)),
        catchError(err => throwError(() => err.error.message)
        )
      )
  }

  register(username:  string, email: string, password: string): Observable<boolean> {

    const url = `${this.baseUrl}/auth/register`;
    const body = { email, username, password };

    return this.http.post<LoginResponse>(url, body)
      .pipe(
        map(({ user, token }) => this.setAuthenticated(user, token)),
        catchError(err => throwError(() => err.error.message)
        )
      )
  }


  isFieldOneEqualFieldTwo(field1: string, field2:string){

    return (formGroup: AbstractControl):ValidationErrors | null => {

      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      if (fieldValue1 !== fieldValue2) {

        formGroup.get(field2)?.setErrors({notEqual: true});
        return {notEqual: true}
      }

      formGroup.get(field2)?.setErrors(null);
      return null;

    }


  }

  checkAuthStatus() {
    const url = `${this.baseUrl}/auth/check-token`;

    return this.http.get<CheckTokenResponse>(url)
      .pipe(
        map(({ user, token }) => this.setAuthenticated(user, token)),
        catchError(() => {
          this._authStatus.set(AuthStatus.noAuthenticated)
          return of(false)
        })
      )
  }

  logout(){
    sessionStorage.removeItem('token');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.noAuthenticated);
  }
}
