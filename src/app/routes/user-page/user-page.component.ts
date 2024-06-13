import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { User } from '../../models/interfaces';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, RouterModule ],
  providers: [RouterModule],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
})
export class UserPageComponent implements OnInit {

  public user: User | null = null;
  public userImg: string | undefined;

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.user = this.authService.getCurrentuser;
    this.googleUserImg();
  }

  logOut() {
    this.authService.logOutGoogle();
    this.authService.logout();
  }

  googleUserImg(){
    this.userImg = this.authService.userGoogleImg;
  }
}
