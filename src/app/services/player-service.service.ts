import { YtApiServiceService } from './ytApi-service.service';
import { computed, Injectable, signal, Signal } from '@angular/core';
import ytService from 'youtube-player';
import { YouTubePlayer } from 'youtube-player/dist/types';
import { DtoSongConcrete } from '../models/DTO/DtoSongConcrete';
import { DtoSong } from '../models/DTO/DtoSuggestion';
import { Track } from '../models/DTO/DtoPlaylist';

@Injectable({
  providedIn: 'root'
})
export class PlayerServiceService {



  constructor(private ytService: YtApiServiceService) {

  }

  actualSong?: Signal<DtoSongConcrete | undefined> = signal(undefined);
  yt: YouTubePlayer | undefined;
  songReady = signal(false);
  suggestions = signal<DtoSong[] | Track[]>([]);
  playBackState = signal(false);
  posicionInCola = -1;
  videoView = signal(true);
  isLoop = signal(false);
  playListId = signal('');


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
    this.ytService.getSong(this.suggestions()[this.posicionInCola].videoId).subscribe((song) => {
      console.log(song)
      this.setSong(song);
      this.isNextSongRunning = false;
    });
  }

  previousSong() {

    if (this.actualSong == undefined) {
      return;
    }
    this.ytService.getSong(this.suggestions()[this.posicionInCola].videoId).subscribe((song) => {
      if (this.posicionInCola > 0) {
        this.posicionInCola--;
        this.setSong(song);
      } else {
        this.posicionInCola = this.suggestions().length - 1;
        this.setSong(song);
      }
    }
    );
  }


  async playSong() {
    if (this.actualSong == undefined) {
      return;
    }
    const playerElement = document.getElementById('player');

    if (this.yt == undefined) {
      this.yt = ytService("player",{
        height: '100%',
        width: '100%',
        
        playerVars:{
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
    if(playlistId == undefined){
      return false;
    } else  if (playlistId === this.playListId() && this.playBackState()) {
      return true;
    }
    return false;
  }
  determineisPLaying( videoId : string | undefined ){
    if(this.actualSong!=undefined && videoId!=undefined){
      return this.actualSong()?.videoId === videoId && this.playBackState() ? true : false; 
    }
    return false;
  }
  async saveActualSong(){
    if(this.actualSong != undefined){
      localStorage.setItem('actualSong', JSON.stringify(this.actualSong()));
    }
  }
  getActualSongInLocalStorage(){
    const actualSong = localStorage.getItem('actualSong');
    if(actualSong != null){
      return JSON.parse(actualSong);
    }
    return undefined
  }
  saveSuggestions(){
    if(this.suggestions != undefined){
      localStorage.setItem('suggestions', JSON.stringify(this.suggestions()));
    }
  }
  getSuggestionsInLocalStorage(){
    const suggestions = localStorage.getItem('suggestions');
    if(suggestions != null){
      return JSON.parse(suggestions);
    }
    return undefined
  }
}
