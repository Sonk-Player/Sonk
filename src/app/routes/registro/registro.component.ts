import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  
  public isLoading    = signal(true);

  registerForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]]
  })


  register() {
    const { username, email, password, confirmPassword } = this.registerForm.value;

    if (password !== confirmPassword) {
      return;
    }
    this.authService.register(username,email, password)
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/player'),
          this.isLoading.set(false);
        },
        error: (message) => {
        
          
        }
      })
  }

}