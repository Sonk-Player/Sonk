import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Playlistpersonalizadas, songsBD } from '../models/DTO/DtoPlaylistPersonalizadas';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserPlaylistsService {


  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }


  getPlaylistsByUser() {
    const url = "https://sonkbacknest-production.up.railway.app/playlists/find-by-user-id";
    return this.http.get<Playlistpersonalizadas[]>(url)
  }

  getPlaylistSongs(playlistId: string) {
    const url = `https://sonkbacknest-production.up.railway.app/songs/load-playlist-songs?playlistId=${playlistId}`;
    return this.http.get<songsBD[]>(url)
  }

  createPlaylists(playlistName: string) {
    const url = "https://sonkbacknest-production.up.railway.app/playlists/new-playlist";
    const userId =this.cookieService.get('userId');

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

    return this.http.post<songsBD>(url, body)
    .pipe(
      catchError(err => throwError(() => err.error.message))
    );
  }
}
