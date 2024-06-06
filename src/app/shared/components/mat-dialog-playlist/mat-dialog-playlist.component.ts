import { Component, ContentChild, Inject, Input, OnInit, contentChildren, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { Playlistpersonalizadas, songsBD } from '../../../models/DTO/DtoPlaylistPersonalizadas';
import { RouterModule } from '@angular/router';
import { DtoSongConcrete } from '../../../models/DTO/DtoSongConcrete';
import { catchError, Observable, throwError } from 'rxjs';
import { PlayerServiceService } from '../../../services/player-service.service';
import { LoadingComponent } from '../loading/loading.component';
import { NavService } from '../../../services/nav.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-mat-dialog-playlist',
  standalone: true,
  imports: [MatIconModule, MatDialogModule, MatDialogPlaylistComponent, MatButtonModule, RouterModule, CommonModule],
  templateUrl: './mat-dialog-playlist.component.html',
  styleUrls: ['./mat-dialog-playlist.component.scss']
})
export class MatDialogPlaylistComponent implements OnInit {

  private playerService = inject(PlayerServiceService);
  public navService = inject(NavService)


  @ContentChild(LoadingComponent) loadingComponent: Component | undefined;


  song: DtoSongConcrete | undefined;




  public playlist?: Playlistpersonalizadas[];

  constructor(  ) {
  }

  ngOnInit() {
    console.log(this.navService.state);
    document.getElementById("detector-nav")?.addEventListener('click', (e) => {

      if(e.target != document.getElementById("nav")){
        this.close();
      }

    });

  }

  close(){
    this.navService.state = false
  }





}
