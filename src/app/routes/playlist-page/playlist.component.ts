import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { YtApiServiceService } from '../../services/ytApi-service.service';
import { DtoPlaylist, Track } from '../../models/DTO/DtoPlaylist';
import { getCoverMaxSize, setErrorCover } from '../../utils/covers';
import { DTOsearch } from '../../models/DTO/DtoSearch';
import { ActivatedRoute } from '@angular/router';
import { PlayerServiceService } from '../../services/player-service.service';
import { SongBarComponent } from '../../shared/components/song-bar/song-bar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [MatIconModule, SongBarComponent, CommonModule],
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent{

  private activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.getCoverImg()
    this.activatedRoute.params.subscribe((params: any) => {
      this.getPlaylistTodo(params.id);
    });
  }

  public platylist?: DtoPlaylist;
  public nombre:string = '';
  public track : Track[] = [];
  public coverImg: string = '';
  private ytService = inject(YtApiServiceService);
  public playerService = inject(PlayerServiceService)

  getPlaylistTodo(playlistid : string){
    this.ytService.getPlaylist(playlistid).subscribe(data => {
      this.platylist = data;
      // console.log(this.platylist)
      this.track = this.platylist!.tracks;
      this.getCambiarAutor(this.platylist!.author.name)
    })
  }

  getCoverPlaylists(search: DtoPlaylist) {
    return getCoverMaxSize(search.thumbnails)
  }

  getCambiarAutor(author: string){
    if(author === "YouTube Music"){
      this.nombre = "Sonk"
    }else{
      this.nombre = author
    }
  }

  setErrorCover(id:string) {
    setErrorCover('cover');
  }

  //otra forma de hacer el playn de la playlist
  play(){
    this.ytService.getSong(this.platylist?.tracks[0].videoId).subscribe((song) => {
      this.playerService.setSuggestions(this.track);
    this.playerService.playListId.update( ()=> this.platylist?.id || '')
      this.playerService.setSong(song);
      this.playerService.playSong();
    })
  }
  getCoverImg(){
    this.coverImg = localStorage.getItem('playlistImg') || '../../../assets/img/noSong.webp';
  }

  //play para cada cancion de la playlist
  play2(videoId:string | undefined){
    this.ytService.getSong(videoId).subscribe((song) => {
      this.playerService.setSuggestions(this.track);
      this.playerService.setSong(song);
      this.playerService.playSong();
    })
  }

  determineisPLaying( videoId : string | undefined ){
    return this.playerService.determineisPLaying(videoId) 
  }

  isPlayingPlaylist(){
    return this.playerService.isPlayingPlaylist(this.platylist?.id)
  }


  
}
