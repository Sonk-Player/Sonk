import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-artist-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './artist-header.component.html',
  styleUrl: './artist-header.component.scss'
})
export class ArtistHeaderComponent {

  public image = 'https://www.diphuelva.es/export/sites/dph/cultura/.galleries/imagenes/Foro/Foro_2021/AITANA.jpg';
}
