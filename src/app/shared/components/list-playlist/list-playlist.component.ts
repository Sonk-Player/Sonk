import { Component } from '@angular/core';
import { PlayerServiceService } from '../../../services/player-service.service';
import { Playlistpersonalizadas, songsBD } from '../../../models/DTO/DtoPlaylistPersonalizadas';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserPlaylistsService } from '../../../services/user-playlists.service';
import { CookieService } from 'ngx-cookie-service';
import { DtoSongConcrete } from '../../../models/DTO/DtoSongConcrete';
import { getCoverMaxSize } from '../../../utils/covers';

@Component({
  selector: 'app-list-playlist',
  standalone: true,
  imports: [CommonModule,MatIconModule, ReactiveFormsModule],
  templateUrl: './list-playlist.component.html',
  styleUrl: './list-playlist.component.scss'
})
export class ListPlaylistComponent {

  playlist: Playlistpersonalizadas[] = [];

  constructor(
    private playerService : PlayerServiceService,
    private userPlaylistsService : UserPlaylistsService,
    private fb : FormBuilder,
    private cookieService: CookieService
  ) { }


  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
  })


  ngOnInit(): void {
    this.loadPlaylists();
  }


  loadPlaylists() {
    this.userPlaylistsService.getPlaylistsByUser().subscribe((res) => {
      this.playlist = res;
    });
  }

  newPlaylist() {
    const name = this.myForm.get('name')?.value;
    this.userPlaylistsService.createPlaylists(name).subscribe((res) => {
      this.loadPlaylists();
    });
    this.myForm.reset();
  }

  newSong(playlistId: string){

    if(this.playerService.actualSong == undefined){
      return;
    }

    const userId =this.cookieService.get('userId');
    let song = this.playerService.actualSong();
    if('author' in song!){
      song = song as DtoSongConcrete;
      const songData: songsBD = {
        playlistId: playlistId || "",
        userId: userId || "",
        videoId: song?.videoId || "",
        img: getCoverMaxSize(song.thumbnails)|| "",
        title: this.playerService.actualSong()?.title || "",
        artist: song.author || "",
        duration: song.durationSeconds || "",
      };

    this.userPlaylistsService.addSong(songData).subscribe((res) => {
    });
    }else{
      song = song as songsBD
      const songData: songsBD = {
        playlistId: playlistId || "",
        userId: userId || "",
        videoId: song?.videoId || "",
        img: song.img || "",
        title: song.title || "",
        artist: song.artist || "",
        duration: song.duration || "",
      };
      this.userPlaylistsService.addSong(songData).subscribe((res) => {});
    }

  }
}
