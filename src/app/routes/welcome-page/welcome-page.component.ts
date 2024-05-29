import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  providers: [RouterModule],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss',
})
export class WelcomePageComponent implements OnInit {

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


}