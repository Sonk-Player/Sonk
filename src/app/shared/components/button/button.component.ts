import { Component, Input } from '@angular/core';
import {MatChipsModule} from '@angular/material/chips';
import { MenuItems } from '../../interfaces/menuItems.interface';
@Component({
  selector: 'app-button',
  standalone: true,
  imports: [MatChipsModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  @Input()
  text?: string = 'Sin nombre';

  public menuItems: MenuItems[] = [
    {name: 'Home', route: '/home'},
    {name: 'Playlists', route: '/playlists'},
    {name: 'Profile', route: '/profile'}
  ];


}
