import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AfterViewChecked, Component, computed, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { QueueSongComponent } from '../queueSong/queueSong.component';
import { PlayerServiceService } from '../../../services/player-service.service';
import { YtApiServiceService } from '../../../services/ytApi-service.service';
import { HttpClientModule } from '@angular/common/http';
import { convertedTime } from '../../../utils/converterTime';
import { SuggestionListComponent } from '../suggestion-list/suggestion-list.component';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../loading/loading.component';
import { MatDialogPlaylistComponent } from '../mat-dialog-playlist/mat-dialog-playlist.component';
import { DialogListaPlaylistComponent } from '../dialog-lista-playlist/dialog-lista-playlist.component';
import { DtoSongConcrete } from '../../../models/DTO/DtoSongConcrete';
import { ListPlaylistComponent } from '../list-playlist/list-playlist.component';
import { NavService } from '../../../services/nav.service';
import { getCoverMaxSize, getCoverMinSizeByString } from '../../../utils/covers';
import { songsBD } from '../../../models/DTO/DtoPlaylistPersonalizadas';

@Component({
  selector: 'playerSide',
  standalone: true,
  imports:
  [
    MatIconModule,
    QueueSongComponent,
    LoadingComponent,
    SuggestionListComponent,
    CommonModule,
    MatDialogPlaylistComponent,
    ListPlaylistComponent
  ],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent implements OnInit {

  actualTime: string = "0:00";
  actualTimeInSecond: number = 0;
  videoState: boolean = false;
  volumenDysplay :boolean = false;
  constructor(
    public playerService: PlayerServiceService,
    private ytApiService: YtApiServiceService,
    public dialog: MatDialog,
    public navService:NavService
  ) { }


  openDialog(song: DtoSongConcrete | songsBD| undefined) {
    this.navService.state = true;
  }



  ngOnInit(): void {
    setTimeout(() => {
      this.getActualTime();
      document.getElementById('player')?.classList.add('pointer-events-none')
      this.loadActualSong();
      this.loadSuggestions();

    }, 1000);

  }

  changeVideoState(){
    this.videoState = !this.videoState;
    if(this.videoState){
      document.getElementById('player')?.classList.replace('hidden','block')
    }else{
      document.getElementById('player')?.classList.replace('block','hidden')
    }
  }

  loadActualSong() {

    this.playerService.actualSong= computed(() => this.playerService.getActualSongInLocalStorage());
    this.playSong();
    setTimeout(() => {
      this.pauseSong()
    }, 2000);
  }
  loadSuggestions() {1
    this.playerService.suggestions.update(() => this.playerService.getSuggestionsInLocalStorage());
  }
  playSong() {
    this.actualTime = "0:00";
    this.getActualTime();
    this.playerService.playSong();
  }
  pauseSong() {
    this.playerService.pauseSong();
  }

  resumeSong() {
    this.playerService.resumeSong();
  }
  // getSong(){
  //   this.ytApiService.getSong().subscribe((res) => {
  //     this.playerService.actualSong = computed(() => res);
  //   })
  // }
  getSuggestions() {
    this.ytApiService.getSuggestions("Alan Walker", 'pIWaVJPl0-c').subscribe((res) => {
      this.playerService.suggestions.update(() => res);
    })
  }
  getAuthor() {
    let song = this.playerService.actualSong();
    if(song != undefined){

      if('author' in song){
        return song.author
      }else{
        let song = this.playerService.actualSong() as songsBD
        return song.artist
      }
    }
    return ''


  }
  getTime() {
    if (this.playerService.actualSong == undefined || this.playerService.actualSong() == undefined) {
      return "0:00";
    }
    else {
      let song = this.playerService.actualSong();
      if("durationSeconds" in this.playerService.actualSong()!){
        song = song as DtoSongConcrete
        return convertedTime(song.durationSeconds);
      }else{
        song = song as songsBD
        return convertedTime(song.duration);
      }
    }

  }

  getActualTime() {
    setInterval(async () => {
      let duration = this.playerService.yt?.getDuration().then(res => {
        return res;
      }
      );
      let actualTimeYt = this.playerService.yt?.getCurrentTime().then(res => {
        this.actualTimeInSecond = res;
        return res;
      }
      );
      if(await actualTimeYt === await duration){
        if (this.playerService.isLoop() == true  ) {

          this.playerService.yt?.seekTo(0, true);
          this.playerService.yt?.playVideo();

        }

      }

      this.actualTime = convertedTime(this.actualTimeInSecond.toString());

    }, 1000)


  }
  getCover() {
    if (this.playerService.actualSong == undefined || this.playerService.actualSong() == undefined) {
      return "../../../../assets/img/noSong.webp"
    }
    let urlMax = ""
   let song=  this.playerService.actualSong()
   if("thumbnails" in song!){
    song?.thumbnails.forEach((thumbnail) => {
      if (thumbnail.width > 200) {
        urlMax = thumbnail.url;
      }
    })
   }else{
    urlMax= getCoverMinSizeByString(song!.img)
   }

    return urlMax;
  }
  setErrorCover() {
    document.getElementById('player_img')?.setAttribute('src', '../../../../assets/img/noSong.webp');
  }
  setErrorCoverDialog() {
    document.getElementById('dialog_img')?.setAttribute('src', '../../../../assets/img/noSong.webp');
  }
  async changeActualTime(event: Event) {
    event.preventDefault();
    let value = (event.target as HTMLInputElement).value;

    this.playerService.yt?.seekTo(Number.parseInt(value), true);
    this.actualTimeInSecond = Number.parseInt(value);
    this.actualTime = convertedTime(value);

  }
  nextSong() {

    this.playerService.nextSong();
  }
  previousSong() {
    this.playerService.previousSong();
  }
  activeVideo() {
    this.playerService.activeVideo();
  }
  disableVideo() {
    this.playerService.disableVideo();
  }
  activeLoop() {
    this.playerService.activeLoop();
  }
  disableLoop() {
    this.playerService.disableLoop();
  }
  setImageInError() {
    const videoDialog = document.getElementById('video_dialog');
    if (videoDialog) {
      videoDialog.style.backgroundImage = 'url(../../../../assets/img/noSong.webp)';
    }
  }

  activeShafleMode() {
    this.playerService.createRandomSuggestions();
    this.playerService.shafleMode.update(() => true);

  }
  disableShafleMode() {
    this.playerService.shafleMode.update(() => false);

  }

  changeStateVolumen(){
    this.volumenDysplay = !this.volumenDysplay;
  }
  changeVolume(event: Event){
    let value = (event.target as HTMLInputElement).value;

    this.playerService.setVolumen(Number.parseInt(value));
  }
}
