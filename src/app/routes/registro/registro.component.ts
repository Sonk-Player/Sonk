import { Component, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { TranslateModule } from '@ngx-translate/core';

import { AuthConfig } from 'angular-oauth2-oidc';
import { UserGoogleResponse } from '../../models/interfaces/userGoogle-response.interface';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule, TranslateModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {


  public userData: UserGoogleResponse | undefined;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm.get('confirmPassword')?.valueChanges.subscribe((res) => {

      this.passwordMismatch();
    });
  }

  public isLoading = signal(true);
  registerForm: FormGroup = this.fb.group({
    email: [
      null,
      Validators.compose([
        Validators.required,
        Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
        Validators.maxLength(50)
      ]),
    ],
    username: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(15)],
    ],
    password: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(16)],
    ],
    confirmPassword: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(30)],
    ],
  }, { validators: this.authService.isFieldOneEqualFieldTwo('password', 'confirmPassword')});

  private passwordMismatch() {
    const password = this.registerForm.get('password');
    const confirmPassword = this.registerForm.get('confirmPassword');

    this.errors.password = password?.value == confirmPassword?.value ? '' : 'Las contraseñas no coinciden';
  }

  public errors = {
    email: '',
    username: '',
    password: '',
  };

  register() {
    const { username, email, password, confirmPassword } =
      this.registerForm.value;

    if (password !== confirmPassword) {
      return;
    }
    this.authService.register(username, email, password).subscribe({
      next: () => {
        this.router.navigateByUrl('/player'), this.isLoading.set(false);
      },
      error: (error) => {
        if (error === 'email') {
          this.errors.email = 'Ese email ya está en uso';
        } else {
          this.errors.email = '';
        }

        if (error === 'username') {
          this.errors.username = 'Ese nombre de usuario no está disponible';
        } else {
          this.errors.username = '';
        }
      },
    });
  }

  //! Google Auth

  registerGoogle() {
    this.authService.registerGoogleService();
  }

  // registerGoogleDB() {

  //   this.userData = this.authService.getProfile();

  //   this.authService.registerWithGoogle(this.userData.email, this.userData.name, this.userData.sub).subscribe({
  //     next: () => {
  //       this.router.navigateByUrl('/player'), this.isLoading.set(false);
  //     },
  //     error: (error) => {
  //       if (error === 'email') {
  //         this.errors.email = 'Ese email ya está en uso';
  //       } else {
  //         this.errors.email = '';
  //       }

  //       if (error === 'username') {
  //         this.errors.username = 'Ese nombre de usuario no está disponible';
  //       } else {
  //         this.errors.username = '';
  //       }
  //     },
  //   });
  // }


}
