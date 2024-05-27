import { Component, inject } from '@angular/core';
import { SongBarComponent } from '../../shared/components/song-bar/song-bar.component';
import { ArtistHeaderComponent } from '../../shared/components/artist-header/artist-header.component';
import { SongBoxComponent } from '../../shared/components/song-box/song-box.component';
import { YtApiServiceService } from '../../services/ytApi-service.service';
import { map } from 'rxjs';
import { Inject } from '@angular/core';
import { DtoArtist } from '../../models/DTO/DtoArtist';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [SongBarComponent, ArtistHeaderComponent, SongBoxComponent],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.scss'
})

export class ArtistComponent {

  public artista?: DtoArtist;
  public artistId = 'UCdO8EyeQt8SW9Mj3bnAbWrA';

  constructor(){
    this.getArtist(this.artistId);
  }

  private ytService = inject(YtApiServiceService);

  //SACAR LOS DATOS DEL ARTISTA EN CONCRETO
  getArtist( browserID: string) {
    //browserID la variable
    this.ytService.getArtist(browserID).subscribe((res) => {
      console.log(res);
      this.artista = res;
    })
  }


  public songtitle = '../../../../assets/img/extremoduro.jpg';
  public songalbum = 'Extremoduro';
}
