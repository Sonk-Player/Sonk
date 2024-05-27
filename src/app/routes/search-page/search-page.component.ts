import { Component, inject, OnInit, signal } from '@angular/core';
import { YtApiServiceService } from '../../services/ytApi-service.service';
import { ActivatedRoute } from '@angular/router';
import ytService from 'youtube-player';
import { typesResultSearch } from '../../utils/typesResultSearch';
import { DTOsearch } from '../../models/DTO/DtoSearch';
import { CommonModule } from '@angular/common';
import { SongBoxComponent } from '../../shared/components/song-box/song-box.component';

import { ArtistCardComponent } from '../../shared/components/artist-card/artist-card.component';


import { SongLargeComponent } from '../../shared/components/song-large/song-large.component';
import { ResultBoxComponent } from '../../shared/components/result-box/result-box.component';

@Component({
  selector: 'app-search-page',
  standalone: true,

  imports: [
    CommonModule,
    SongBoxComponent,
    ArtistCardComponent,
    SongLargeComponent,
    ResultBoxComponent
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent implements OnInit {

  private activatedRoute = inject(ActivatedRoute);
  private ytService = inject(YtApiServiceService);

  public search = signal<string>('');
  suggestionMap: Map<string, DTOsearch[]> = new Map(
    [
      ['songs', []],
      ['albums', []],
      ['artists', []],
      ['playlist', []],
      ['topResult', []],
      ['episodes', []],
      ['posdcast', []],

    ]

  );
  constructor() { }

  ngOnInit(): void {


    this.activatedRoute.params.subscribe((params: any) => {
      let { name } = params;

      //LIMPIAMOS EL MAP
      this.suggestionMap.clear();
      this.suggestionMap = new Map(
        [
          ['songs', []],
          ['albums', []],
          ['artists', []],
          ['playlist', []],
          ['topResult', []],
          ['episodes', []],
          ['posdcast', []],
        ]
      );

      this.ytService.search(name).subscribe((res) => {
        console.log(res);

        res.map((item) => {
          if (item.category == new typesResultSearch().songs) {
            this.suggestionMap.get('songs')?.push(item);
          }
          if (item.category == new typesResultSearch().albums) {
            this.suggestionMap.get('albums')?.push(item);
          }
          if (item.category == new typesResultSearch().artists) {
            this.suggestionMap.get('artists')?.push(item);
          }
          if (item.category == new typesResultSearch().playlist) {
            this.suggestionMap.get('playlist')?.push(item);
          }
          if (item.category == new typesResultSearch().topResult) {
            if(item.resultType == "episode"){
              console.log(res[1]);
              this.suggestionMap.get('topResult')?.push(res[1]);
            }else{

              this.suggestionMap.get('topResult')?.push(item);
            }

          }
        });
        console.log(this.suggestionMap);
      });
    });
  }
}
