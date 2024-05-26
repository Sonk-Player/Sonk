import { Component, Input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { DtoSong } from '../../../models/DTO/DtoSuggestion';
import { QueueSongComponent } from '../queueSong/queueSong.component';

@Component({
  selector: 'app-suggestion-list',
  standalone: true,
  imports: [QueueSongComponent],
  templateUrl: './suggestion-list.component.html',
  styleUrl: './suggestion-list.component.scss'
})
export class SuggestionListComponent implements OnChanges {
  
   

    @Input() suggestions: DtoSong[] = [];

  

    ngOnChanges(changes: SimpleChanges): void {
      
    }

 

}
