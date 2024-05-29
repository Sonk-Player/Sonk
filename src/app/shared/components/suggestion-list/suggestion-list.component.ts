import { Component, Input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { DtoSong } from '../../../models/DTO/DtoSuggestion';
import { QueueSongComponent } from '../queueSong/queueSong.component';
import { Track } from '../../../models/DTO/DtoPlaylist';

@Component({
  selector: 'app-suggestion-list',
  standalone: true,
  imports: [QueueSongComponent],
  templateUrl: './suggestion-list.component.html',
  styleUrl: './suggestion-list.component.scss'
})
export class SuggestionListComponent implements OnChanges {
  
   

    @Input() suggestions: DtoSong[] | Track[] = [];

    ngOnChanges(changes: SimpleChanges): void {
      
    }

 

}
