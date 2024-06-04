import { Component, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-switchLang',
  standalone: true,
  imports: [],
  templateUrl: './switchLang.component.html',
  styleUrl: './switchLang.component.scss'
})
export class SwitchLangComponent implements OnInit{

  language: string = 'es';
  flagSrc: string = '../../../../assets/img/es.png';

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    this.translate.use('es');
    this.flagSrc = '../../../../assets/img/en.png';
  }

  changeLanguage() {
    if (this.language === 'en') {
      this.language = 'es';
      this.flagSrc = '../../../../assets/img/en.png';
    } else {
      this.language = 'en';
      this.flagSrc = '../../../../assets/img/es.png';
    }
    this.translate.use(this.language);
  }

}
