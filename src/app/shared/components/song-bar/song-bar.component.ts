import { ReactiveFormsModule } from '@angular/forms';
import { Component, inject, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PlayerServiceService } from '../../../services/player-service.service';
import { DTOsearch } from '../../../models/DTO/DtoSearch';
import { YtApiServiceService } from '../../../services/ytApi-service.service';
import { getCoverMinSize, setErrorCover } from '../../../utils/covers';
import { Thumbnail } from '../../../models/interfaces/thumails';
@Component({
  selector: 'app-song-bar',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './song-bar.component.html',
  styleUrl: './song-bar.component.scss'
})
export class SongBarComponent {

  private ytService = inject(YtApiServiceService);
  private playerService = inject(PlayerServiceService);
  @Input() song : string | undefined;

  @Input()
  public title: string = '';

  @Input()
  public cover: Thumbnail[] = [];

  @Input()
  public artist: string = '';

  play(){
    if(this.playerService.actualSong != undefined){
      this.ytService.getSong(this.song).subscribe((song) => {
        this.ytService.getSuggestions(this.artist, "").subscribe((suggestions) => {
          this.playerService.setSuggestions(suggestions);
        });
        this.playerService.setSong(song);
        this.playerService.playSong();
      })
    }
  }

  getCover()
  {
    return getCoverMinSize(this.cover);
  }
  setErrorCover(id : string){
    setErrorCover(id);
  }
}
