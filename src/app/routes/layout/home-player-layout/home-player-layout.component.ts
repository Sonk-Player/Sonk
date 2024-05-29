import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { PlayerComponent } from '../../../shared/components/player/player.component';
import { RouterModule } from '@angular/router';
import { SongBoxComponent } from '../../../shared/components/song-box/song-box.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { GenreCardComponent } from '../../../shared/components/genre-card/genre-card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { AlbumBoxComponent } from '../../../shared/components/album-box/album-box.component';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { LoginComponent } from '../../login/login.component';
import { NotificationServiceService } from '../../../services/notification-service.service';
import { MatIconModule } from '@angular/material/icon';
import { PlayerServiceService } from '../../../services/player-service.service';
import { PlaylistComponent } from '../../playlist-page/playlist.component';



@Component({
  selector: 'homePlayerLayout',
  standalone: true,
  imports: [
    PlayerComponent,
    RouterModule,
    SongBoxComponent,
    MatSidenavModule,
    GenreCardComponent,
    ButtonComponent,
    AlbumBoxComponent,
    NavbarComponent,
    LoginComponent,
    MatIconModule,
    PlaylistComponent
  ],
  templateUrl: './home-player-layout.component.html',
  styleUrl: './home-player-layout.component.scss'
})
export class HomePlayerLayoutComponent {

  @ViewChild("sidenav") sidenav: MatSidenav | undefined;

  private NotificationService = inject(NotificationServiceService);

  public playerService = inject(PlayerServiceService);

  public text: string = 'Sin nombre';

  public route: string = '';

  public modeView = false;

  public openNav = false;

  public iphone = false



  ngOnInit(): void {



    this.detectedIphone()


  }

  detectedIphone(){
   navigator.userAgent.match(/iPhone/i) ? this.iphone = true : this.iphone = false
    if(this.iphone == true){
      document.body.style.overflowY = "scroll"

    }
  }

  toggleNav(){
    this.sidenav?.opened ? this.close(): this.open()

  }
  close(){
    this.sidenav?.close()
    document.getElementById("icon_open")?.classList.replace('rotate-180' , 'rotate-0')
    document.getElementById("icon_open")?.classList.replace('rounded-tr-md' , 'rounded-bl-md')

  }
  open(){
    this.sidenav?.open()
    document.getElementById("icon_open")?.classList.replace('rotate-0' , 'rotate-180')
    document.getElementById("icon_open")?.classList.replace('rounded-bl-md' , 'rounded-tr-md')
  }


}
