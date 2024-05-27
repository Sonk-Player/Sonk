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


  // inSearch : boolean = false;
  // suggestionMap : Map<string, DTOsearch[]> = new Map(
  //   [
  //     ['songs', []],
  //     ['albums', []],
  //     ['artists', []],
  //     ['playlist', []],
  //     ['moreFromYoutube', []],
  //     ['topResult', []],
  //     ['episodes', []],
  //     ['posdcast', []],

  //   ]

  // );


  onSubmit() {



  }


  search() {
    let { search } = this.searchForm.value;

    if (search == undefined) {
      return;
    }

    this.router.navigate(['/search', search]);

    //   this.ytService.search(searchValue).subscribe((res) => {


  }
}


//     res.map((item) => {
//       if(item.category ==new typesResultSearch().songs){
//         this.suggestionMap.get('songs')?.push(item)
//       }
//       if(item.category == new typesResultSearch().albums){
//         this.suggestionMap.get('albums')?.push(item)
//       }
//       if(item.category == new typesResultSearch().artists){
//         this.suggestionMap.get('artists')?.push(item)
//       }
//       if(item.category == new typesResultSearch().playlist){
//         this.suggestionMap.get('playlist')?.push(item)
//       }
//       if(item.category == new typesResultSearch().moreFromYoutube){
//         this.suggestionMap.get('moreFromYoutube')?.push(item)
//       }
//       if(item.category == new typesResultSearch().topResult){
//         this.suggestionMap.get('topResult')?.push(item)
//       }

//     })
//     console.log(this.suggestionMap)
//   }
//   );
