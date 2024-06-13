import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { UserGoogleResponse } from '../../models/interfaces/userGoogle-response.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isLoading = signal(true);
  public userData: UserGoogleResponse | undefined;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }



  loginForm = this.fb.group({
    email: [
      null,
      Validators.compose([
        Validators.required,
        Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
        Validators.maxLength(50)
      ]),
    ],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]]
  });

  public error: string = '';


  ngOnInit() {
  }

  login() {
    const { email, password } = this.loginForm.value;

    if (email && password) {
      this.authService.login(email, password)
        .subscribe({
          next: () => {
            this.router.navigateByUrl('/player'),
              this.isLoading.set(false);
          },
          error: (error) => {
            this.error = error
          }
        });
    } else {
      console.log(Error);
    }
  }

  //! Login google

  loginGoogle() {
    this.authService.registerGoogleService();
    this.loginGoogleDB();
  }

  loginGoogleDB() {
    this.userData = this.authService.getProfile();

    if (this.userData) {
      this.authService.loginWithGoogle(this.userData.email, this.userData.sub).subscribe({
        next: () => {
          this.router.navigateByUrl('/player'),
            this.isLoading.set(false);
        },
        error: (error) => {
          this.error = error
        }
      });
    }else{
      console.log(Error);
    }
  }


}
