import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-result-box',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './result-box.component.html',
  styleUrls: ['./result-box.component.scss']
})
export class ResultBoxComponent {

  constructor() { }

  @Input()
  album?: string;
  @Input()
  nameSong?: string;
  @Input()
  artist?: string;

}
