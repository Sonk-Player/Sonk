import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  public isLoading    = signal(true);

  loginForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });


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
            console.log(error);
          }
        });
    } else {
     console.log(Error);
    }
  }

}
