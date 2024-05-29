import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
})

export class AuthLayoutComponent implements OnInit {


  public imagenes = [
    {
      url: '../../../../assets/login/login1.jpg',
    },
    {
      url: '../../../../assets/login/login2.jpg',
    },
    {
      url: '../../../../assets/login/login4.jpg',
    },
    {
      url: '../../../../assets/login/login5.jpg',
    },
  ];

  image : string = '';


  changeBgImage() {
    setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.imagenes.length;
      this.image = this.imagenes[this.currentImageIndex].url;
    }, 10000);
  }

  public currentImageIndex = 0;

  ngOnInit() {
    this.image = this.imagenes[this.currentImageIndex].url;
    this.changeBgImage();
  }

  constructor() { }


}
