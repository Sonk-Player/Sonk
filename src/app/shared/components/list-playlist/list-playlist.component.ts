import { Component } from '@angular/core';
import { PlayerServiceService } from '../../../services/player-service.service';
import { Playlistpersonalizadas, songsBD } from '../../../models/DTO/DtoPlaylistPersonalizadas';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-list-playlist',
  standalone: true,
  imports: [CommonModule,MatIconModule],
  templateUrl: './list-playlist.component.html',
  styleUrl: './list-playlist.component.scss'
})
export class ListPlaylistComponent {

  playlist: Playlistpersonalizadas[] = [];

  constructor(private playerService : PlayerServiceService) { }

  ngOnInit(): void {
    this.loadPlaylist();
  }


  loadPlaylist() {
    this.playerService.getPlaylists().subscribe((res) => {
      this.playlist = res;
    });
  }
  newSong(){

    if(this.playerService.actualSong == undefined){
      return;
    }

    const userId = sessionStorage.getItem('userId')
    const songData: songsBD = {
          playlistId: this.playlist?.[0].playlistId || "",
          userId: userId || "",
          videoId: this.playerService.actualSong()?.videoId || "",
          img: this.playerService.actualSong()?.thumbnails[0].url || "",
          title: this.playerService.actualSong()?.title || "",
          artist: this.playerService.actualSong()?.author || "",
          duration: this.playerService.actualSong()?.viewCount || "",
        };

    this.playerService.addSong(songData).subscribe((res) => {
      console.log(res);
    });
  }
}
