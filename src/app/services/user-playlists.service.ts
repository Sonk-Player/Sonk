import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Playlistpersonalizadas, songsBD } from '../models/DTO/DtoPlaylistPersonalizadas';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserPlaylistsService {


  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  getPlaylistsByUser() {
    const url = `${environment.AUTH}/playlists/find-by-user-id`;
    return this.http.get<Playlistpersonalizadas[]>(url)
  }

  getPlaylistSongs(playlistId: string) {
    const url = `${environment.AUTH}/songs/load-playlist-songs?playlistId=${playlistId}`;
    return this.http.get<songsBD[]>(url)
  }

  createPlaylists(playlistName: string) {
    const url = `${environment.AUTH}/playlists/new-playlist`;
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

    const url = `${environment.AUTH}/songs/add-song`;

    const { playlistId, userId, videoId, img, title, duration, artist } = songData;
    const body = { playlistId, userId, videoId, img, title, duration, artist };

    return this.http.post<songsBD>(url, body)
    .pipe(
      catchError(err => throwError(() => err.error.message))
    );
  }

}
