import { Component} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-switchLang',
  standalone: true,
  imports: [],
  templateUrl: './switchLang.component.html',
  styleUrl: './switchLang.component.scss'
})
export class SwitchLangComponent {

  language: string = 'es';
  flagSrc: string = '../../../../assets/img/en.png';

  constructor(private translate: TranslateService) { }

  changeLanguage() {
    if (this.language === 'en') {
      this.language = 'es';
      this.flagSrc = '../../../../assets/img/es.png';
    } else {
      this.language = 'en';
      this.flagSrc = '../../../../assets/img/en.png';
    }
    this.translate.use(this.language);
  }

}
