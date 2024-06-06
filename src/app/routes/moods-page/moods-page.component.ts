import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YtApiServiceService } from '../../services/ytApi-service.service';
import { DtoPlaylist, Track } from '../../models/DTO/DtoPlaylist';
import { getCoverMaxSize, setErrorCover } from '../../utils/covers';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { SongBarComponent } from '../../shared/components/song-bar/song-bar.component';
import { PlayerServiceService } from '../../services/player-service.service';
import { DTOsearch } from '../../models/DTO/DtoSearch';
import { SongBoxComponent } from '../../shared/components/song-box/song-box.component';


@Component({
  selector: 'app-moods-page',
  standalone: true,
  imports:  [MatIconModule, SongBarComponent, CommonModule,SongBoxComponent],
  templateUrl: './moods-page.component.html',
  styleUrl: './moods-page.component.scss'
})
export class MoodsPageComponent implements OnInit {


  private route = inject(ActivatedRoute)
  private ytService = inject(YtApiServiceService) 
  private playerService = inject(PlayerServiceService)
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.get();
    });
    
  }

  public id: string | undefined;
  public search : DTOsearch[] = [];


  get(){
    if(this.id == undefined) return;
    this.ytService.getByMood(this.id).subscribe(data => {
      this.search = data;

    })
  }

}
