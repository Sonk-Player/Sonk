import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { Playlistpersonalizadas } from '../../../models/DTO/DtoPlaylistPersonalizadas';
import { RouterModule } from '@angular/router';
import { DtoSongConcrete } from '../../../models/DTO/DtoSongConcrete';

interface songBBDD {
  playlistId: string;
  userId: string
  videoId: string;
  img: string;
  title: string;
  artist: string;
  durantion: string;
}

@Component({
  selector: 'app-mat-dialog-playlist',
  standalone: true,
  imports: [MatIconModule, MatDialogModule, MatDialogPlaylistComponent, MatButtonModule, RouterModule],
  templateUrl: './mat-dialog-playlist.component.html',
  styleUrls: ['./mat-dialog-playlist.component.scss']
})
export class MatDialogPlaylistComponent implements OnInit {

  song: DtoSongConcrete | undefined;

  url: string = "https://sonkbacknest-production.up.railway.app/playlists/all-playlists";

  public playlist?: Playlistpersonalizadas[];

  constructor(
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: { song: DtoSongConcrete }
  ) {
    this.song = data.song;
  }

  ngOnInit() {
    this.sacarPlaylist();
  }
  sacarPlaylist() {
    this.http.get<Playlistpersonalizadas[]>(this.url)
      .subscribe(data => {
        this.playlist = data;
      });
  }

  addSong(): void {
    const addSongUrl = 'https://sonkbacknest-production.up.railway.app/songs/add-song';
    
    const song2: songBBDD = {
      playlistId: "uynsbtvom9rcxw8po3rypd",
      userId: "66581be83ef257dd934567ce",
      videoId: this.song?.videoId || "",
      img: this.song?.thumbnails[0].url || "",
      title: this.song?.title || "",
      artist: this.song?.author || "",
      durantion: this.song?.viewCount || "",
    };
    
    console.log(song2);

    this.http.post(addSongUrl, song2).subscribe({
      next: response => {
        console.log('Song added successfully', response);
      },
      error: error => {
        console.error('Error adding song', error);
      }
    });
  }
}
