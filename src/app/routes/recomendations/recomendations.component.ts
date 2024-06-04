import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { SongBoxComponent } from '../../shared/components/song-box/song-box.component';
import { ActivatedRoute } from '@angular/router';
import { TypeObject } from '../../models/types/typeObjects';
import { YtApiServiceService } from '../../services/ytApi-service.service';
import { DTOsearch } from '../../models/DTO/DtoSearch';


@Component({
  selector: 'app-recomendations',
  standalone: true,
  imports: [CommonModule, SongBoxComponent],
  templateUrl: './recomendations.component.html',
  styleUrl: './recomendations.component.scss'
})
export class RecomendationsComponent implements OnInit {

  private ytService = inject(YtApiServiceService);
  private activatedRoute = inject(ActivatedRoute);

  public dataResult: DTOsearch[] = [];
  public type = signal<string>('');

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {

      this.type.set(params.type);

      if (this.type() == "playlist") {
        this.ytService.search('top españa', 'featured_playlists').subscribe((res: any) => {
          this.dataResult = res;
          this.ytService.search('top playlists', 'community_playlists').subscribe((res: any) => {
            this.dataResult = this.dataResult.concat(res);
          });
        })
      }

      if (this.type() == "album") {
        this.ytService.search('top 50', 'albums').subscribe((res: any) => {
          this.dataResult = res;
        })
      }

      if (this.type() == "podcast") {
        this.ytService.getPodcasts('podcast').subscribe((res: any) => {
          this.dataResult = res;
        })
      }
    });
  }

}
