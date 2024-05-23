
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-song-box',
  standalone: true,
  imports: [],
  templateUrl: './song-box.component.html',
  styleUrl: './song-box.component.scss'
})

export class SongBoxComponent implements OnInit{
  

  @Input() 
  caratulaAlbum?: string;
  @Input()
  nombreAlbum?: string;
  
  constructor() { }

  ngOnInit(): void {
    
  }

}
