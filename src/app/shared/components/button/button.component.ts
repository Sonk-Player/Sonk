import { Component, Input } from '@angular/core';
import {MatChipsModule} from '@angular/material/chips';
import { MenuItems } from '../../../models/interfaces/menuItems.interface';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-button',
  standalone: true,
  imports: [MatChipsModule, RouterModule, MatIconModule, TranslateModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  @Input()
  text?: string = 'Sin nombre';

  public menuItems: MenuItems[] = [
    {name: 'player.chips.home', route: '/home', icon: 'home'},
    {name: 'player.chips.playlists', route: '/player/recommendations/playlist', icon: 'playlist_play'},
    {name: 'player.chips.podcasts', route: '/player/recommendations/podcast', icon: 'podcasts'},
    {name: 'player.chips.albums', route: '/player/recommendations/album', icon: 'album'},
  ];


}
