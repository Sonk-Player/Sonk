import { Component, Inject, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { Playlistpersonalizadas, songsBD } from '../../../models/DTO/DtoPlaylistPersonalizadas';
import { RouterModule } from '@angular/router';
import { DtoSongConcrete } from '../../../models/DTO/DtoSongConcrete';
import { catchError, Observable, throwError } from 'rxjs';
import { PlayerServiceService } from '../../../services/player-service.service';


@Component({
  selector: 'app-mat-dialog-playlist',
  standalone: true,
  imports: [MatIconModule, MatDialogModule, MatDialogPlaylistComponent, MatButtonModule, RouterModule],
  templateUrl: './mat-dialog-playlist.component.html',
  styleUrls: ['./mat-dialog-playlist.component.scss']
})
export class MatDialogPlaylistComponent implements OnInit {

  private playerService = inject(PlayerServiceService);

  song: DtoSongConcrete | undefined;


  public playlist?: Playlistpersonalizadas[];

  constructor( @Inject(MAT_DIALOG_DATA) public data: { song: DtoSongConcrete }) {
    this.song = data.song;
  }

  ngOnInit() {
    this.loadPlaylist();
  }


  loadPlaylist() {
    this.playerService.getPlaylists().subscribe((res) => {
      this.playlist = res;
    });
  }


  newSong(){
    const userId = sessionStorage.getItem('userId')
    const songData: songsBD = {
          playlistId: this.playlist?.[0].playlistId || "",
          userId: userId || "",
          videoId: this.song?.videoId || "",
          img: this.song?.thumbnails[0].url || "",
          title: this.song?.title || "",
          artist: this.song?.author || "",
          duration: this.song?.viewCount || "",
        };

    this.playerService.addSong(songData).subscribe((res) => {
      console.log(res);
    });
  }
}
