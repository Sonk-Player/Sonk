import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/interfaces';


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
  
  constructor( 
    private authService: AuthService
  ) {}
  
  ngOnInit(): void {
    this.user = this.authService.getCurrentuser
  }

}
