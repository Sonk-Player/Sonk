import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-edit-page',
  standalone: true,
  imports: [MatIconModule, ReactiveFormsModule, CommonModule],
  templateUrl: './user-edit-page.component.html',
  styleUrls: ['./user-edit-page.component.scss']
})
export class UserEditPageComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  editUser: FormGroup = this.fb.group({
    username: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(15)],
    ],
    password: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(16)],
    ],
    passwordAntigua: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(16)],
    ],
    confirmPassword: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(16)],
    ],
  }, { validators: this.authService.isFieldOneEqualFieldTwo('password', 'confirmPassword')});


  sacarPorConsola(){
    console.log(this.editUser.value);
  }

  actualizarusuario(){
    
  }

}
