import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { Playlistpersonalizadas } from '../../../models/DTO/DtoPlaylistPersonalizadas';
import { RouterModule } from '@angular/router';
import { DtoSongConcrete } from '../../../models/DTO/DtoSongConcrete';
import { catchError, Observable, throwError } from 'rxjs';

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

  url: string = "https://sonkbacknest-production.up.railway.app/playlists/all-playlists";


  song: DtoSongConcrete | undefined;


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
        console.log(this.playlist);
      });
  }

  sacarDatosdeCancion(cancion: Playlistpersonalizadas) {
    console.log(cancion);
  }



  addSong(): Observable<any> {

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

    return this.http.post<any>(addSongUrl, song2).pipe(
      catchError(err => {
        console.error('There was an error!', err);
        return throwError(() => err.error.message);
    })
    );
  }
}
