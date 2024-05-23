import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-album-box',
  standalone: true,
  imports: [],
  templateUrl: './album-box.component.html',
  styleUrls: ['./album-box.component.scss']
})
export class AlbumBoxComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() 
  caratulaAlbum?: string;
  @Input()
  nombreAlbum?: string;
  


}
