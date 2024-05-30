import { Component, OnInit} from '@angular/core';

import { getCoverMinSize, getCoverMaxSize } from '../../utils/covers';
import { DTOsearch } from '../../models/DTO/DtoSearch';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'error-main-page',
  standalone: true,
  imports: [CommonModule],
  providers: [],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.scss',
})
export class ErrorPageComponent implements OnInit {

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }



}
