import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlayerComponent } from './shared/components/player/player.component';
import { HomePlayerLayoutComponent } from './routes/layout/home-player-layout/home-player-layout.component'
import { SongBoxComponent } from './shared/components/song-box/song-box.component';
import {  HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LoginComponent } from './routes/login/login.component';
import { WelcomePageComponent } from './routes/welcome-page/welcome-page.component';
import {NgcCookieConsent, NgcCookieConsentConfig, NgcCookieConsentService, NgcInitializationErrorEvent, NgcInitializingEvent, NgcNoCookieLawEvent, NgcStatusChangeEvent, provideNgcCookieConsent} from 'ngx-cookieconsent';
import { Subscription } from 'rxjs';

const cookieConfig:NgcCookieConsentConfig = {
  "position": "bottom-right",
  "theme": "edgeless",
  "palette": {
    "popup": {
      "background": "#191919",
      "text": "#ffffff",
      "link": "#ffffff"
    },
    "button": {
      "background": "#db2777",
      "text": "#ffffff",
      "border": "transparent"
    }
  },
  "type": "info",
  "content": {
    "message": "Sonk usa cookies para asegurarse de que tengas la mejor experiencia musical.",
    "dismiss": "¡Quiero escuchar música!",
    "deny": "Rechazar Cookies",
    "link": "Saber más",
    "href": "https://cookiesandyou.com",
    "policy": "🍪🍪🍪"
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatSidenavModule, PlayerComponent, HomePlayerLayoutComponent,SongBoxComponent, WelcomePageComponent,
    NavbarComponent, LoginComponent
  ],
  providers: [HttpClientModule, provideNgcCookieConsent(cookieConfig)],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  public title = '../../assets/extremoduro.jpg';
  public album = 'Extremoduro';

   //keep refs to subscriptions to be able to unsubscribe later
   private popupOpenSubscription!: Subscription;
   private popupCloseSubscription!: Subscription;
   private initializingSubscription!: Subscription;
   private initializedSubscription!: Subscription;
   private initializationErrorSubscription!: Subscription;
   private statusChangeSubscription!: Subscription;
   private revokeChoiceSubscription!: Subscription;
   private noCookieLawSubscription!: Subscription;

   constructor(private ccService: NgcCookieConsentService){}

   ngOnInit() {
     this.popupOpenSubscription = this.ccService.popupOpen$.subscribe(
       () => {

       });

     this.popupCloseSubscription = this.ccService.popupClose$.subscribe(
       () => {
       });

     this.initializingSubscription = this.ccService.initializing$.subscribe(
       (event: NgcInitializingEvent) => {
       });

     this.initializedSubscription = this.ccService.initialized$.subscribe(
       () => {
       });

     this.initializationErrorSubscription = this.ccService.initializationError$.subscribe(
       (event: NgcInitializationErrorEvent) => {
       });

     this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
       (event: NgcStatusChangeEvent) => {
       });

     this.revokeChoiceSubscription = this.ccService.revokeChoice$.subscribe(
       () => {
       });

       this.noCookieLawSubscription = this.ccService.noCookieLaw$.subscribe(
       (event: NgcNoCookieLawEvent) => {
       });
   }

   ngOnDestroy() {
     // unsubscribe to cookieconsent observables to prevent memory leaks
     this.popupOpenSubscription.unsubscribe();
     this.popupCloseSubscription.unsubscribe();
     this.initializingSubscription.unsubscribe();
     this.initializedSubscription.unsubscribe();
     this.initializationErrorSubscription.unsubscribe();
     this.statusChangeSubscription.unsubscribe();
     this.revokeChoiceSubscription.unsubscribe();
     this.noCookieLawSubscription.unsubscribe();
   }

}
