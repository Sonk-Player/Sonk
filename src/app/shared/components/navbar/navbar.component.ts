import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { YtApiServiceService } from '../../../services/ytApi-service.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DTOsearch } from '../../../models/DTO/DtoSearch';
import { typesResultSearch } from '../../../utils/typesResultSearch';
import { ArtistCardComponent } from '../artist-card/artist-card.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, ArtistCardComponent, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  private fb = inject(FormBuilder);
  
  public searchForm: FormGroup = this.fb.group({
    search: ['', [Validators.required]]
  });

  public resultAutoComplete: string[] = []; 

  constructor(private ytService: YtApiServiceService, private router: Router) { }

  search() {
    let { search } = this.searchForm.value;

    if (search == undefined) {
      return;
    }
    this.router.navigate(['/search', search]);
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
}
