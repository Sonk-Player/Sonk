import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { YtApiServiceService } from '../../../services/ytApi-service.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArtistCardComponent } from '../artist-card/artist-card.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { SwitchLangComponent } from '../switchLang/switchLang.component';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, ArtistCardComponent, MatIconModule, SwitchLangComponent, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{

  private fb = inject(FormBuilder);

  public userImg: string | undefined;

  public searchForm: FormGroup = this.fb.group({
    search: ['', [Validators.required]]
  });

  public resultAutoComplete: string[] = [];

  constructor(
    private ytService: YtApiServiceService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.googleUserImg();
  }

  search() {
    let { search } = this.searchForm.value;

    if (search == undefined) {
      return;
    }
    this.router.navigate(['/player/search', search]);
  }

  getAutoComplete() {

    this.ytService.getAutocomplete(this.searchForm.value.search).subscribe((res) => {
      this.resultAutoComplete = res;

    }
    );
  }
  onClickAutoComplete(value: string) {
    this.searchForm.setValue({ search: value });
    this.search();
    this.disableAutoComplete();
  }

  disableAutoComplete() {

    this.resultAutoComplete = [];
  }

  enterPressed(event: any) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.search();
    }
  }

  googleUserImg(){
    this.userImg = this.authService.userGoogleImg;
    console.log(this.userImg);

  }
}
