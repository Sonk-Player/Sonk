import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  public isLoading    = signal(true);

  loginForm = this.fb.group({
    email: [
      null,
      Validators.compose([
        Validators.required,
        Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
        Validators.maxLength(50)
      ]),
    ],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]]
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

}
