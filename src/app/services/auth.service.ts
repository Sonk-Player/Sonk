import { Injectable, NgZone, computed, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { User, AuthStatus, LoginResponse, CheckTokenResponse, RegisterResponse } from '../models/interfaces';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { UserGoogleResponse } from '../models/interfaces/userGoogle-response.interface';


@Injectable({
  providedIn: 'root'

})
export class AuthService {

  private user: User | null = null;
  private readonly baseUrl: string = environment.AUTH;
  private http = inject(HttpClient);

  private authCodeSubject = new BehaviorSubject<string | null>(null);
  public authCode$ = this.authCodeSubject.asObservable();
  public dataUserGoogle: UserGoogleResponse | undefined;

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor(
    private cookieService: CookieService,
    private oauthService: OAuthService
  ) {
    this.initGoogleAuth();
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

  get getCurrentuser(): User | null {
    return this.user;
  }

  login(email: string, password: string): Observable<boolean> {

    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password };

    return this.http.post<RegisterResponse>(url, body)
      .pipe(
        map(({ user, token }) => {
          return this.setAuthenticated(user, token);
        }),
        catchError(err => throwError(() => err.error.message)
        )
      )
  }

  register(username: string, email: string, password: string): Observable<boolean> {

    const url = `${this.baseUrl}/auth/register`;
    const body = { email, username, password, isGoogle: false };

    return this.http.post<LoginResponse>(url, body)
      .pipe(
        tap(() => console.log('hola abajo')),
        map(({ user, token }) => this.setAuthenticated(user, token)),
        catchError(err => throwError(() => err.error.message)
        )
      )
  }


  isFieldOneEqualFieldTwo(field1: string, field2: string) {

    return (formGroup: AbstractControl): ValidationErrors | null => {

      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      if (fieldValue1 !== fieldValue2) {

        formGroup.get(field2)?.setErrors({ notEqual: true });
        return { notEqual: true }
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

  logout() {
    sessionStorage.removeItem('token');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.noAuthenticated);
  }


  //! Google Auth

  initGoogleAuth() {
    const config: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: environment.CLIENT_ID,
      redirectUri: window.location.origin + '/player',
      scope: 'openid profile email',
    };

    this.oauthService.configure(config);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  registerGoogleService() {
    this.oauthService.initLoginFlow();
    this.getProfile();
  }

  logOutGoogle() {
    this.oauthService.logOut();
  }

  getProfile() {
    this.dataUserGoogle = this.oauthService.getIdentityClaims() as UserGoogleResponse;
  }

  registerWithGoogle(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/register`;

    console.log('dataUserGoogle:', this.dataUserGoogle);

    const email = this.dataUserGoogle?.email;
    const username = this.dataUserGoogle?.name;
    const password = this.dataUserGoogle?.sub;

    const body = { email, username, password, isGoogle: true };
    console.log('body:', body);

    return this.http.post<LoginResponse>(url, body)
      .pipe(
        tap(response => console.log('response:', response)),
        map(({ user, token }) => this.setAuthenticated(user, token)),
        catchError(err => {
          console.error('HTTP error:', err);
          return throwError(() => err.error.message);
        }),
      );
  }

  loginWithGoogle(): Observable<boolean> {

    const url = `${this.baseUrl}/auth/login`;

    const email = this.dataUserGoogle?.email;
    const password = this.dataUserGoogle?.sub;

    const body = { email, password };
    console.log('body:', body);
    debugger;

    return this.http.post<LoginResponse>(url, body)
      .pipe(
        tap(response => console.log('response:', response)),
        map(({ user, token }) => this.setAuthenticated(user, token)),
        catchError(err => {
          console.error('HTTP error:', err);
          return throwError(() => err.error.message);
        }),
      );
  }
}
