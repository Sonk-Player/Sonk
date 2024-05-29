
import { Component, inject, Input, OnInit } from '@angular/core';
import { PlayerServiceService } from '../../../services/player-service.service';
import { YtApiServiceService } from '../../../services/ytApi-service.service';
import { DTOsearch } from '../../../models/DTO/DtoSearch';
import { Track } from '../../../models/DTO/DtoPlaylist';
import { Router, RouterModule } from '@angular/router';
import { Thumbnail } from '../../../models/interfaces/thumails';
import { getCoverMaxSize } from '../../../utils/covers';


type TypeObject  = 'playlist' | 'albunm'
@Component({
  selector: 'app-song-box',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './song-box.component.html',
  styleUrl: './song-box.component.scss'
})

export class SongBoxComponent {

  public playerService = inject(PlayerServiceService)
  public ytService = inject(YtApiServiceService)
  private router = inject(Router)

  public traks: Track[] = [];


  @Input()
  thumbnail: Thumbnail[] | undefined;
  @Input()
  nombreAlbum?: string;
  @Input()
  browsedId?: string;
  @Input({required : true})
  type : TypeObject ='playlist'

  setErrorCover() {
    document.getElementById(this.browsedId+'-cover')?.setAttribute('src', '../../../../assets/img/noSong.webp');
  }

  getCover(){
    return getCoverMaxSize(this.thumbnail  || []);
  }

  goTo(){
    console.log("HOla");
    if(this.type === 'playlist'){
      this.savePlaylistImg()
      this.router.navigate(['/player/playlist',this.browsedId])
    }
    if(this.type === 'albunm'){
      this.router.navigate(['.',this.browsedId])
    }


  }
  savePlaylistImg(){
   return localStorage.setItem('playlistImg',this.getCover())
  }
}
