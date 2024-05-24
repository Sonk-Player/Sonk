import { Component, Input } from '@angular/core';
import {MatChipsModule} from '@angular/material/chips';
import { MenuItems } from '../../interfaces/menuItems.interface';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-button',
  standalone: true,
  imports: [MatChipsModule, RouterModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  @Input()
  text?: string = 'Sin nombre';

  public menuItems: MenuItems[] = [
    {name: 'Home', route: '/home'},
    {name: 'Playlists', route: '/playlists'},
    {name: 'Profile', route: '/profile'},
    {name: 'Artist', route: '/artist'}
  ];


}
