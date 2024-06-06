import { Component, Input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { DtoSong } from '../../../models/DTO/DtoSuggestion';
import { QueueSongComponent } from '../queueSong/queueSong.component';
import { Track } from '../../../models/DTO/DtoPlaylist';
import { songsBD } from '../../../models/DTO/DtoPlaylistPersonalizadas';

@Component({
  selector: 'app-suggestion-list',
  standalone: true,
  imports: [QueueSongComponent],
  templateUrl: './suggestion-list.component.html',
  styleUrl: './suggestion-list.component.scss'
})
export class SuggestionListComponent implements OnChanges {


    type : "sonk" | "user" = "sonk";
    @Input() suggestions: DtoSong[] | Track[]  | songsBD[]= [];

    suggestionsSonk : DtoSong[] | Track[] = [];
    suggestionsUser : songsBD[] = [];
    ngOnChanges(changes: SimpleChanges): void {
      this.getSuggestions()
    }

    ngOnInit() {
      this.getSuggestions();
    }

    getSuggestions(){
      let song = this.suggestions[0];
      if(song != undefined){

        if('duration_seconds' in song){
          this.type = "sonk";
          this.suggestionsSonk = this.suggestions as DtoSong[];
        }else {
          this.type = "user";
          this.suggestionsUser = this.suggestions as songsBD[];
        }
      }
    }

}
