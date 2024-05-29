import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { YtApiServiceService } from '../../services/ytApi-service.service';
import { DtoPlaylist, Track } from '../../models/DTO/DtoPlaylist';
import { getCoverPlaylists } from '../../utils/covers';
import { DTOsearch } from '../../models/DTO/DtoSearch';
import { ActivatedRoute } from '@angular/router';
import { PlayerServiceService } from '../../services/player-service.service';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent{

  private activatedRoute = inject(ActivatedRoute);

  constructor(
  ) {
    this.activatedRoute.params.subscribe((params: any) => {
      console.log(params.id)
      this.getPlaylistTodo(params.id);
    });
  }

  public platylist?: DtoPlaylist;
  public nombre:string = '';
  public track : Track[] = [];

  private ytService = inject(YtApiServiceService);
  public playerService = inject(PlayerServiceService)

  getPlaylistTodo(playlistid : string){
    this.ytService.getPlaylist(playlistid).subscribe(data => {
      this.platylist = data;
      this.track = this.platylist!.tracks;
      this.getCambiarAutor(this.platylist!.author.name)
    })
  }

  getCoverPlaylists(search: DTOsearch) {
    return getCoverPlaylists(search)
  }

  getCambiarAutor(author: string){
    if(author === "YouTube Music"){
      this.nombre = "Sonk"
    }else{
      this.nombre = author
    }
  }

  
  play(){
    this.ytService.getSong(this.platylist?.tracks[0].videoId).subscribe((song) => {
      this.playerService.setSuggestions(this.track);
      this.playerService.setSong(song);
      this.playerService.playSong();
    })
  }

}
