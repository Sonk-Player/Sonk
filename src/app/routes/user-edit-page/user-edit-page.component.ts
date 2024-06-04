import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-edit-page',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './user-edit-page.component.html',
  styleUrls: ['./user-edit-page.component.scss']
})
export class UserEditPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
