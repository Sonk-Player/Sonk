import { Injectable, NgZone, computed, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, filter, map, of, tap, throwError } from 'rxjs';
import { User, AuthStatus, LoginResponse, CheckTokenResponse, RegisterResponse } from '../models/interfaces';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthConfig, OAuthService, OAuthSuccessEvent } from 'angular-oauth2-oidc';
import { UserGoogleResponse } from '../models/interfaces/userGoogle-response.interface';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'

})
export class AuthService {

  private user: User | null = null;
  private readonly baseUrl: string = environment.AUTH;
  private http = inject(HttpClient);

  private authCodeSubject = new BehaviorSubject<string | null>(null);
  public authCode$ = this.authCodeSubject.asObservable();
  public userGoogleImg: string | undefined;

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor(
    private cookieService: CookieService,
    private oauthService: OAuthService,
    private router: Router,
  ) {
    try {
      this.initGoogleAuth();
    } catch (error) {
      console.error('Error initializing Google Auth:', error);
    }

    this.oauthService.events
      .pipe(filter(e => e.type === 'token_received'))
      .subscribe((e) => {
        this.oauthService.loadUserProfile().then(() => {
          const claims = this.oauthService.getIdentityClaims() as UserGoogleResponse;
          if (claims) {
            this.handleGoogleLogin(claims);
          }
        }).catch(err => console.error('Error loading user profile:', err));
      });

    try {
      this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
        if (this.oauthService.hasValidAccessToken()) {
          const claims = this.oauthService.getIdentityClaims() as UserGoogleResponse;
          if (claims) {
            this.handleGoogleLogin(claims);
            this.userGoogleImg = claims.picture;
          }
        }
      }).catch(error => console.error('Error trying to login:', error));
    } catch (error) {
      console.error('Error trying to login:', error);
    }
  }

  private setAuthenticated(user: User, token: string): boolean {
    if (!user || !token) {
      return false;
    }
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
        map(({ user, token }) => this.setAuthenticated(user, token)),
        catchError(err => throwError(() => err.error.message))
      );
  }

  register(username: string, email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/auth/register`;
    const body = { email, username, password, isGoogle: false };

    return this.http.post<LoginResponse>(url, body)
      .pipe(
        map(({ user, token }) => this.setAuthenticated(user, token)),
        catchError(err => throwError(() => err.error.message))
      );
  }

  isFieldOneEqualFieldTwo(field1: string, field2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      if (fieldValue1 !== fieldValue2) {
        formGroup.get(field2)?.setErrors({ notEqual: true });
        return { notEqual: true };
      }

      formGroup.get(field2)?.setErrors(null);
      return null;
    };
  }

  checkAuthStatus() {
    const url = `${this.baseUrl}/auth/check-token`;

    return this.http.get<CheckTokenResponse>(url)
      .pipe(
        map(({ user, token }) => this.setAuthenticated(user, token)),
        catchError(() => {
          this._authStatus.set(AuthStatus.noAuthenticated);
          return of(false);
        })
      );
  }

  logout() {
    this.oauthService.logOut();
    this.cookieService.delete('token', '/');
    this.cookieService.delete('userId', '/');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.noAuthenticated);
    this.router.navigate(['/login']);
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
    this.oauthService.loadDiscoveryDocumentAndTryLogin().catch(error => {
      console.error('Error loading discovery document:', error);
    });
  }

  registerGoogleService() {
    this.oauthService.initLoginFlow();
  }

  logOutGoogle() {
    this.oauthService.logOut();
  }

  getProfile() {
    const claims = this.oauthService.getIdentityClaims() as UserGoogleResponse;
    if (!claims) return undefined;
    console.log('claims:', claims);
    return claims;
  }

  handleGoogleLogin(claims: UserGoogleResponse) {
    // Intenta registrar el usuario con los datos de Google
    this.registerWithGoogle(claims.email, claims.name, claims.sub).subscribe({
      next: success => {
        if (success) {
          this.router.navigate(['/player']);
          console.log('Registrado e iniciado sesión con Google');
        } else {
          // Si el registro falla (probablemente porque ya está registrado), intenta iniciar sesión
          this.loginWithGoogle(claims.email, claims.sub).subscribe({
            next: loginSuccess => {
              if (loginSuccess) {
                console.log('Inicio de sesión con Google exitoso');
              } else {
                console.log('Error en el inicio de sesión con Google');
              }
            },
            error: error => {
              console.log('Error en el inicio de sesión con Google:', error);
            }
          });
        }
      },
      error: error => {
        console.log('Error en el registro con Google:', error);
        // Si hay un error en el registro, intentar iniciar sesión
        this.loginWithGoogle(claims.email, claims.sub).subscribe({
          next: loginSuccess => {
            if (loginSuccess) {
              console.log('Inicio de sesión con Google exitoso');
              this.router.navigate(['/player']);
            } else {
              console.log('Error en el inicio de sesión con Google');
            }
          },
          error: loginError => {
            console.log('Error en el inicio de sesión con Google:', loginError);
          }
        });
      }
    });
  }

  registerWithGoogle(email: string, username: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/auth/register`;
    const body = { email, username, password, isGoogle: true };

    return this.http.post<LoginResponse>(url, body)
      .pipe(
        map(({ user, token }) => this.setAuthenticated(user, token)),
        catchError(err => throwError(() => err.error.message))
      );
  }

  loginWithGoogle(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password };

    return this.http.post<LoginResponse>(url, body)
      .pipe(
        map(({ user, token }) => this.setAuthenticated(user, token)),
        catchError(err => throwError(() => err.error.message))
      );
  }
}
