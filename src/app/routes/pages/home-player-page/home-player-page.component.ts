import { Component } from '@angular/core';
import { PlayerComponent } from '../../../shared/components/player/player.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'homePlayerPage',
  standalone: true,
  imports: [PlayerComponent, RouterModule],
  templateUrl: './home-player-page.component.html',
  styleUrl: './home-player-page.component.scss'
})
export class HomePlayerPageComponent {

}
