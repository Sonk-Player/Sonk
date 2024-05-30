
import { Component, inject, Input, OnInit } from '@angular/core';
import { PlayerServiceService } from '../../../services/player-service.service';
import { YtApiServiceService } from '../../../services/ytApi-service.service';
import { Track } from '../../../models/DTO/DtoPlaylist';
import { Router, RouterModule } from '@angular/router';
import { Thumbnail } from '../../../models/interfaces/thumails';
import { getCoverMaxSize } from '../../../utils/covers';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-song-box',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
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
  type!: string;

  @Input()
  width?: string;

  @Input()
  height?: string;

  ngOnInit() {
  }

  setErrorCover() {
    document.getElementById(this.browsedId+'-cover')?.setAttribute('src', '../../../../assets/img/noSong.webp');
  }

  getCover(){
    return getCoverMaxSize(this.thumbnail  || []);
  }

  goTo(){
    if(this.type === 'playlist'){
      this.savePlaylistImg()
      this.router.navigate(['/player/playlist',this.browsedId])
    }
    if(this.type === 'album'){
      this.router.navigate(['.',this.browsedId])
    }
  }
  savePlaylistImg(){
   return localStorage.setItem('playlistImg',this.getCover())
  }
}
