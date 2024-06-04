import { Component, Input } from '@angular/core';
import {MatChipsModule} from '@angular/material/chips';
import { MenuItems } from '../../../models/interfaces/menuItems.interface';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-button',
  standalone: true,
  imports: [MatChipsModule, RouterModule, MatIconModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  @Input()
  text?: string = 'Sin nombre';

  public menuItems: MenuItems[] = [
    {name: 'Inicio', route: '/home', icon: 'home'},
    {name: 'Playlists', route: '/player/recommendations/playlist', icon: 'playlist_play'},
    {name: 'Pódcasts', route: '/player/recommendations/podcast', icon: 'podcasts'},
    {name: 'Álbums', route: '/player/recommendations/album', icon: 'album'},
  ];


}
