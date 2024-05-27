import { Component } from '@angular/core';
import { YtApiServiceService } from '../../services/ytApi-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {

  constructor(private ytService:YtApiServiceService, private activeRouter:ActivatedRoute ) { 

  }



  

}
