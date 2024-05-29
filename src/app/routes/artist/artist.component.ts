import { Component, inject, Input, OnInit } from '@angular/core';
import { SongBarComponent } from '../../shared/components/song-bar/song-bar.component';
import { ArtistHeaderComponent } from '../../shared/components/artist-header/artist-header.component';
import { SongBoxComponent } from '../../shared/components/song-box/song-box.component';
import { YtApiServiceService } from '../../services/ytApi-service.service';
import { DtoArtist } from '../../models/DTO/DtoArtist';
import { ActivatedRoute } from '@angular/router';
import { getCoverPlaylists, setErrorCover } from '../../utils/covers';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [SongBarComponent, ArtistHeaderComponent, SongBoxComponent],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.scss'
})

export class ArtistComponent {

  private activatedRoute = inject(ActivatedRoute);
  private ytService = inject(YtApiServiceService);

  public artista?: DtoArtist;

  constructor(){

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.getArtist(params.id);
    });

  }
  //SACAR LOS DATOS DEL ARTISTA EN CONCRETO
  getArtist( browserID: string) {
    //browserID la variable
    this.ytService.getArtist(browserID).subscribe((res) => {
      this.artista = res;
    })
  }

  getCover(){

    return getCoverPlaylists(this.artista?.thumbnails || []);
  }
  setErrorCover(id : string) {
    return setErrorCover(id);
  }

}
