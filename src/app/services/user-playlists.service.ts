import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Playlistpersonalizadas, songsBD } from '../models/DTO/DtoPlaylistPersonalizadas';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserPlaylistsService {


  constructor(
    private http: HttpClient,
  ) { }


  getPlaylistsByUser() {
    const url = "https://sonkbacknest-production.up.railway.app/playlists/find-by-user-id";
    return this.http.get<Playlistpersonalizadas[]>(url)
  }

  createPlaylists(playlistName: string) {
    const url = "https://sonkbacknest-production.up.railway.app/playlists/new-playlist";
    const userId = sessionStorage.getItem('userId');
    const body = { playlistName, userId };

    return this.http.post(url, body).pipe(
      catchError(err => {
        console.error('There was an error!', err);
        return throwError(() => err.error.message);
      })
    );
  }


  addSong(songData: songsBD): Observable<songsBD> {

    const url = 'https://sonkbacknest-production.up.railway.app/songs/add-song';

    const { playlistId, userId, videoId, img, title, duration, artist } = songData;
    const body = { playlistId, userId, videoId, img, title, duration, artist };

    return this.http.post<songsBD>(url, body).pipe(
      catchError(err => {
        console.error('There was an error!', err);
        return throwError(() => err.error.message);
      })
    );
  }
}
