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

  "cookie": {
    "domain": "tinesoft.github.io"
  },
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
    "deny": "Refuse cookies",
    "link": "Saber más",
    "href": "https://cookiesandyou.com",
    "policy": "Cookie Policy"
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
     // subscribe to cookieconsent observables to react to main events
     this.popupOpenSubscription = this.ccService.popupOpen$.subscribe(
       () => {
         // you can use this.ccService.getConfig() to do stuff...
       });

     this.popupCloseSubscription = this.ccService.popupClose$.subscribe(
       () => {
         // you can use this.ccService.getConfig() to do stuff...
       });

     this.initializingSubscription = this.ccService.initializing$.subscribe(
       (event: NgcInitializingEvent) => {
         // the cookieconsent is initilializing... Not yet safe to call methods like `NgcCookieConsentService.hasAnswered()`
         console.log(`initializing: ${JSON.stringify(event)}`);
       });

     this.initializedSubscription = this.ccService.initialized$.subscribe(
       () => {
         // the cookieconsent has been successfully initialized.
         // It's now safe to use methods on NgcCookieConsentService that require it, like `hasAnswered()` for eg...
         console.log(`initialized: ${JSON.stringify(event)}`);
       });

     this.initializationErrorSubscription = this.ccService.initializationError$.subscribe(
       (event: NgcInitializationErrorEvent) => {
         // the cookieconsent has failed to initialize...
         console.log(`initializationError: ${JSON.stringify(event.error?.message)}`);
       });

     this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
       (event: NgcStatusChangeEvent) => {
         // you can use this.ccService.getConfig() to do stuff...
       });

     this.revokeChoiceSubscription = this.ccService.revokeChoice$.subscribe(
       () => {
         // you can use this.ccService.getConfig() to do stuff...
       });

       this.noCookieLawSubscription = this.ccService.noCookieLaw$.subscribe(
       (event: NgcNoCookieLawEvent) => {
         // you can use this.ccService.getConfig() to do stuff...
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
