import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { YtApiServiceService } from '../../../services/ytApi-service.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DTOsearch } from '../../../models/DTO/DtoSearch';
import { typesResultSearch } from '../../../utils/typesResultSearch';
import { ArtistCardComponent } from '../artist-card/artist-card.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, ArtistCardComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  private fb = inject(FormBuilder);

  public searchForm: FormGroup = this.fb.group({
    search: ['', [Validators.required]]
  });

  constructor(private ytService: YtApiServiceService, private router: Router) { }

  search() {
    let { search } = this.searchForm.value;

    if (search == undefined) {
      return;
    }
    this.router.navigate(['/search', search]);
  }
}
