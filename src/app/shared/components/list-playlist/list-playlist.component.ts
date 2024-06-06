import { Component } from '@angular/core';
import { PlayerServiceService } from '../../../services/player-service.service';
import { Playlistpersonalizadas, songsBD } from '../../../models/DTO/DtoPlaylistPersonalizadas';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserPlaylistsService } from '../../../services/user-playlists.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { Title } from '@angular/platform-browser';

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
    private snack : SnackbarService
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

    const userId = sessionStorage.getItem('userId')
    const songData: songsBD = {
          playlistId: playlistId || "",
          userId: userId || "",
          videoId: this.playerService.actualSong()?.videoId || "",
          img: this.playerService.actualSong()?.thumbnails[0].url || "",
          title: this.playerService.actualSong()?.title || "",
          artist: this.playerService.actualSong()?.author || "",
          duration: this.playerService.actualSong()?.viewCount || "",
        };

    this.userPlaylistsService.addSong(songData).subscribe((res) => {

    });

    this.snack.openSnackBar('Se ha añadido correctamente "' + songData.title + '" a "' + this.playlist[0].playlistName + '"', 'snackbar-error');
  }
}
