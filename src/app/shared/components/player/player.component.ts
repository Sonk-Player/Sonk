import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { QueueSongComponent } from '../queueSong/queueSong.component';

@Component({
  selector: 'playerSide',
  standalone: true,
  imports: [MatIconModule, QueueSongComponent],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {

}
