import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SwitchLangComponent } from '../../../shared/components/switchLang/switchLang.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterModule, CommonModule, TranslateModule, SwitchLangComponent, MatIconModule],
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
})

export class AuthLayoutComponent implements OnInit {

  public currentImageIndex = 0;

  ngOnInit() {

  }

  constructor() { }


}
