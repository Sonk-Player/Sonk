
import { Component, inject, Input, OnInit } from '@angular/core';
import { PlayerServiceService } from '../../../services/player-service.service';
import { YtApiServiceService } from '../../../services/ytApi-service.service';
import { DTOsearch } from '../../../models/DTO/DtoSearch';
import { DtoPlaylist, Track } from '../../../models/DTO/DtoPlaylist';
import { Router, RouterModule } from '@angular/router';
import { Thumbnail } from '../../../models/interfaces/thumails';
import { getCoverMaxSize } from '../../../utils/covers';
import { MatIconModule } from '@angular/material/icon';


type TypeObject  = 'playlist' | 'albunm'
@Component({
  selector: 'app-song-box',
  standalone: true,
  imports: [RouterModule, MatIconModule],
  templateUrl: './song-box.component.html',
  styleUrl: './song-box.component.scss'
})

export class SongBoxComponent implements OnInit{

  public playerService = inject(PlayerServiceService)
  public ytService = inject(YtApiServiceService)
  private router = inject(Router)

  public track: Track[] = [];
  public playlist?: DtoPlaylist;

  ngOnInit(): void {
    if(this.browsedId === undefined) return;
    this.getPlaylistTodo(this.browsedId)
  }



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

  getPlaylistTodo(playlistid : string){
    this.ytService.getPlaylist(playlistid).subscribe(data => {
      this.playlist = data;
      this.track = this.playlist.tracks;
    })
  }

  play() {

    if(this.track === undefined){return}
    console.log(this.track)

    this.ytService.getSong(this.track[0].videoId).subscribe((song) => {
      this.playerService.setSuggestions(this.track);
    this.playerService.playListId.update( ()=> this.track[0].videoId || '')
      this.playerService.setSong(song);
      this.playerService.playSong();
    })
};
}



        

