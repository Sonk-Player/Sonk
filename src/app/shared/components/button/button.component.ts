import { Component, Input } from '@angular/core';
import {MatChipsModule} from '@angular/material/chips';
import { MenuItems } from '../../../models/interfaces/menuItems.interface';
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
    {name: 'Playlists', route: '/player/recommendations/playlist'},
    {name: 'Pódcasts', route: '/player/recommendations/podcast'},
    {name: 'Albums', route: '/player/recommendations/album'},
  ];


}
