import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { Playlistpersonalizadas } from '../../../models/DTO/DtoPlaylistPersonalizadas';
import { RouterModule } from '@angular/router';

interface Playlist {
  playlistName: string,
}

@Component({
  selector: 'app-mat-dialog-playlist',
  standalone: true,
  imports: [MatIconModule, MatDialogModule, MatDialogPlaylistComponent, MatButtonModule, RouterModule],
  templateUrl: './mat-dialog-playlist.component.html',
  styleUrls: ['./mat-dialog-playlist.component.scss']
})
export class MatDialogPlaylistComponent implements OnInit {

  url : string = "https://sonkbacknest-production.up.railway.app/playlists/all-playlists";

  public playlist?: Playlistpersonalizadas [];

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.sacarPlaylist();
  }
    sacarPlaylist() {
      this.http.get<Playlistpersonalizadas[]>(this.url)
        .subscribe(data => {
          this.playlist = data;
        });
    
    }



}
