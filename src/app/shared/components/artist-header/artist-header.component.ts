import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-artist-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './artist-header.component.html',
  styleUrl: './artist-header.component.scss'
})
export class ArtistHeaderComponent {

  @Input()
  public image = '';

  @Input()
  public name = '';
}
