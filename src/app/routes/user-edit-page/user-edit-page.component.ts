import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/interfaces';

@Component({
  selector: 'app-user-edit-page',
  standalone: true,
  imports: [MatIconModule, ReactiveFormsModule, CommonModule],
  templateUrl: './user-edit-page.component.html',
  styleUrls: ['./user-edit-page.component.scss']
})
export class UserEditPageComponent implements OnInit {

  public user: User | null = null;
  public userImg: string | undefined;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.user = this.authService.getCurrentuser;
    this.editUser.get('username')?.setValue(this.user?.username);
    this.googleUserImg();
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

  googleUserImg(){
    this.userImg = this.authService.userGoogleImg;
  }

}
