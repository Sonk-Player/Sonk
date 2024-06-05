import { YtApiServiceService } from './ytApi-service.service';
import { computed, Injectable, signal, Signal } from '@angular/core';
import ytService from 'youtube-player';
import { YouTubePlayer } from 'youtube-player/dist/types';
import { DtoSongConcrete } from '../models/DTO/DtoSongConcrete';
import { DtoSong } from '../models/DTO/DtoSuggestion';
import { Track } from '../models/DTO/DtoPlaylist';
import { HttpClient } from '@angular/common/http';
import { Playlistpersonalizadas, songsBD } from '../models/DTO/DtoPlaylistPersonalizadas';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerServiceService {



  constructor(
    private ytService: YtApiServiceService,
    private http: HttpClient,
  ) {

  }

  actualSong?: Signal<DtoSongConcrete | undefined> = signal(undefined);
  yt: YouTubePlayer | undefined;
  songReady = signal(false);
  suggestions = signal<DtoSong[] | Track[]>([]);
  randomSuggestions = signal<DtoSong[] | Track[]>([]);
  playBackState = signal(false);
  posicionInCola = 0;
  videoView = signal(true);
  isLoop = signal(false);
  playListId = signal('');
  inLoadMusic = signal(false);
  shafleMode = signal(false);

  private isNextSongRunning = false;





  nextSong() {
    if (this.actualSong == undefined || this.isNextSongRunning) {
      return;
    }
    this.isNextSongRunning = true;

    this.posicionInCola++;
    if (this.posicionInCola >= this.suggestions().length) {
      this.posicionInCola = 0;
    }
    this.inLoadMusic.update(() => true);
    if (this.shafleMode()) {
      this.ytService.getSong(this.randomSuggestions()[this.posicionInCola].videoId).subscribe((song) => {
        this.inLoadMusic.update(() => false);
        this.setSong(song);
        this.isNextSongRunning = false;

      })
    } else {
      this.ytService.getSong(this.suggestions()[this.posicionInCola].videoId).subscribe((song) => {
        this.inLoadMusic.update(() => false);
        this.setSong(song);
        this.isNextSongRunning = false;
      });
    }

  }

  previousSong() {

    if (this.actualSong == undefined) {
      return;
    }
    this.inLoadMusic.update(() => true);
    this.posicionInCola--;
    if (this.shafleMode()) {

      this.ytService.getSong(this.randomSuggestions()[this.posicionInCola].videoId).subscribe((song) => {
        if (this.posicionInCola > 0) {

          this.setSong(song);
        } else {

          this.setSong(song);
        }
        this.inLoadMusic.update(() => false);
      }
      );

    } else {
      this.ytService.getSong(this.suggestions()[this.posicionInCola].videoId).subscribe((song) => {
        if (this.posicionInCola > 0) {

          this.setSong(song);
        } else {
          this.posicionInCola = this.suggestions().length - 1;
          this.setSong(song);
        }
        this.inLoadMusic.update(() => false);
      }
      );
    }

  }


  async playSong() {
    if (this.actualSong == undefined) {
      return;
    }
    const playerElement = document.getElementById('player');

    if (this.yt == undefined) {
      this.yt = ytService("player", {
        height: '100%',
        width: '100%',

        playerVars: {
          color: 'red',
          fs: 1,
          controls: 0,

        }
      });
      this.hiddenControls();

    }
    this.saveActualSong();
    if (playerElement) {

      const urlEmbedded = this.actualSong()?.urlEmbedded;

      if (urlEmbedded) {
        this.yt.loadVideoByUrl(urlEmbedded);
        this.playBackState.update(() => true);
        this.yt.on('ready', () => {
          this.yt?.playVideo();
          this.songReady.update(() => true);

        });

        this.yt.on('stateChange', (event) => {
          if (event.data == 0) {
            if (this.isLoop()) {
              this.yt?.playVideo();
            } else {
              this.nextSong();

            }
          }
        });
        await this.yt.getIframe().then((iframe) => {
          iframe.style.width = '100%';
          iframe.style.height = '100%';
          iframe.style.border = '1px solid black';
          iframe.style.aspectRatio = '16/9';
        })
      }
    }


    //   console.log("Cargando")
    //  await this.youtubePlayer.loadVideoByUrl('https://www.youtube.com/watch?v=v08qmr8m_-w')



  }


  resumeSong() {

    this.yt?.playVideo();
    this.playBackState.update(() => true);

  }

  pauseSong() {

    this.yt?.pauseVideo();
    this.playBackState.update(() => false);

  }
  setSong(song: DtoSongConcrete) {
    if (this.actualSong == undefined) {
      return;
    }
    this.actualSong = computed(() => song);
    this.playSong();
  }
  setSuggestions(res: DtoSong[] | Track[]) {
    this.suggestions.update(() => res);
    this.saveSuggestions();
  }
  activeVideo() {

    this.videoView.update(() => {

      document.getElementById('video_dialog')?.classList.replace('hidden', 'flex');
      return true
    });
  }

  private hiddenControls() {
    this.yt?.getIframe().then((iframe) => {
      iframe.setAttribute('controls', '0');
    });
  }
  disableVideo() {
    this.videoView.update(() => {

      document.getElementById('video_dialog')?.classList.replace('flex', 'hidden');
      return true
    });
  }
  activeLoop() {

    this.isLoop.update(() => true);
  }
  disableLoop() {
    this.isLoop.update(() => false);
  }
  isPlayingPlaylist(playlistId: string | undefined) {
    if (playlistId == undefined) {
      return false;
    } else if (playlistId === this.playListId() && this.playBackState()) {
      return true;
    }
    return false;
  }
  determineisPLaying(videoId: string | undefined) {
    if (this.actualSong != undefined && videoId != undefined) {
      return this.actualSong()?.videoId === videoId && this.playBackState() ? true : false;
    }
    return false;
  }
  async saveActualSong() {
    if (this.actualSong != undefined) {
      localStorage.setItem('actualSong', JSON.stringify(this.actualSong()));
      localStorage.setItem('posicionInCola', this.posicionInCola.toString());
    }
  }
  getActualSongInLocalStorage() {
    const actualSong = localStorage.getItem('actualSong');
    if (actualSong != null && actualSong != "undefined") {
      console.log("entro")
      return JSON.parse(actualSong);
    }
    return undefined
  }
  saveSuggestions() {
    if (this.suggestions != undefined) {
      localStorage.setItem('suggestions', JSON.stringify(this.suggestions()));
      localStorage.setItem('posicionInCola', this.posicionInCola.toString());
    }
  }
  getSuggestionsInLocalStorage() {
    const suggestions = localStorage.getItem('suggestions');
    const posicionInCola = localStorage.getItem('posicionInCola');
    if (suggestions != null && suggestions !== "undefined") {
      this.posicionInCola = JSON.parse(posicionInCola || '0');
      return JSON.parse(suggestions);

    } else {
      this.posicionInCola = JSON.parse('0');
    }
    return undefined
  }

  createRandomSuggestions() {
    const oldSuggestions = JSON.parse(JSON.stringify(this.suggestions()));
    this.posicionInCola = 0;
    this.randomSuggestions.update(() => this.suggestions().sort(() => Math.random() - 0.5))
    this.nextSong();
    this.suggestions.update(() => oldSuggestions);
  }
  setVolumen(volumen: number) {
    this.yt?.setVolume(volumen);
  }


  getPlaylists() {
    const url = "https://sonkbacknest-production.up.railway.app/playlists/all-playlists";
    return this.http.get<Playlistpersonalizadas[]>(url)
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
