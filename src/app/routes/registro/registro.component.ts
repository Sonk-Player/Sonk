import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
  }
  

  registerForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]]
  })

  public myForm: FormGroup = this.fb.group({
    user: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

}