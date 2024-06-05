import { Component, ViewChild, inject } from '@angular/core';
import { PlayerComponent } from '../../../shared/components/player/player.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SongBoxComponent } from '../../../shared/components/song-box/song-box.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { GenreCardComponent } from '../../../shared/components/genre-card/genre-card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { AlbumBoxComponent } from '../../../shared/components/album-box/album-box.component';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { LoginComponent } from '../../login/login.component';
import { MatIconModule } from '@angular/material/icon';
import { PlayerServiceService } from '../../../services/player-service.service';
import { LoaderService } from '../../../services/loader.service';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { delay } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { MatDialogPlaylistComponent } from '../../../shared/components/mat-dialog-playlist/mat-dialog-playlist.component';
import { ListPlaylistComponent } from '../../../shared/components/list-playlist/list-playlist.component';
import { NavService } from '../../../services/nav.service';



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
    LoadingComponent,
    MatDialogPlaylistComponent,
    ListPlaylistComponent
  ],
  templateUrl: './home-player-layout.component.html',
  styleUrl: './home-player-layout.component.scss'
})
export class HomePlayerLayoutComponent {

  @ViewChild("sidenav") sidenav: MatSidenav | undefined;

  private router = inject(Router);
  private loaderService = inject(LoaderService);
  public playerService = inject(PlayerServiceService);
  public text: string = 'Sin nombre';

  public route: string = '';

  public modeView = false;

  public openNav = false;

  public iphone = false

  public loading: boolean = false;





  ngOnInit(): void {
    this.detectedIphone();
    this.listenToLoading();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.listenToLoading();
      }
    });
  }

  detectedIphone() {
    navigator.userAgent.match(/iPhone/i) ? this.iphone = true : this.iphone = false
    if (this.iphone == true) {
      document.body.style.overflowY = "scroll"

    }
  }

  toggleNav() {
    this.sidenav?.opened ? this.close() : this.open()

  }
  close() {
    this.sidenav?.close()
    document.getElementById("icon_open")?.classList.replace('rotate-0', 'rotate-180')
    document.getElementById("icon_open")?.classList.replace('rounded-bl-md', 'rounded-tr-md')

  }
  open() {
    this.sidenav?.open()
    document.getElementById("icon_open")?.classList.replace('rotate-180', 'rotate-0')
    document.getElementById("icon_open")?.classList.replace('rounded-tr-md', 'rounded-bl-md')
  }

  listenToLoading(): void {
    this.loading = true;
    this.loaderService.loadingSub
      .pipe(delay(1000))
      .subscribe((loading) => {
        if (this.loading === loading) {
          return
        } else {

          this.loading = loading;
        }
      });
  }

}
