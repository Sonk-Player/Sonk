import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { DtoSongConcrete } from '../models/DTO/DtoSongConcrete';
import { Observable } from 'rxjs';
import { DtoSong } from '../models/DTO/DtoSuggestion';
import { DTOsearch } from '../models/DTO/DtoSearch';
import { DtoArtist } from '../models/DTO/DtoArtist';
import { DtoMoodCategories } from '../models/DTO/DtoMoodCategories';
import { DtoPlaylist } from '../models/DTO/DtoPlaylist';

@Injectable({
    providedIn: 'root'
})
export class YtApiServiceService {

    constructor(private http: HttpClient){


    }

    onLoadSuggestions = signal(false)
    getSong(videoId: string | undefined) : Observable<DtoSongConcrete>{
        if(videoId == undefined){
            return new Observable<DtoSongConcrete>();
        }

        const url = `${environment.API_BASE_URL_YT}/song?songId=${videoId}`

        return this.http.get<DtoSongConcrete>(url)
    }
    getSuggestions(name: string | undefined, songId:string | undefined): Observable<DtoSong[]>{
        if(name == undefined){
            return new Observable<DtoSong[]>();
        }

        const url = `${environment.API_BASE_URL_YT}/getSuggestions?name=${name}&songId=${songId}`
        return this.http.get<DtoSong[]>(url)

    }
    getTopSongs(limit: string | undefined): Observable<DtoSong[]>{
        if(limit == undefined){
            limit = '20'
        }
        const url = `${environment.API_BASE_URL_YT}/top?limit=${limit}`
        return this.http.get<DtoSong[]>(url)
    }
    search(query : string, filter?: string ): Observable<DTOsearch[]>{
        if(query == undefined){
            return new Observable<DTOsearch[]>();
        }
        let url = ''
        if(filter == undefined){
          url = `${environment.API_BASE_URL_YT}/search?query=${query}`
        }else{
          url = `${environment.API_BASE_URL_YT}/search?query=${query}&filter=${filter}`
        }

        return this.http.get<DTOsearch[]>(url)
    }
    getArtist(chanelId : string ) : Observable<DtoArtist>{
        return this.http.get<DtoArtist>(`${environment.API_BASE_URL_YT}/artist?chanelId=${chanelId}`)

    }
    getMoodCategory() : Observable<DtoMoodCategories>{
        return this.http.get<DtoMoodCategories>(`${environment.API_BASE_URL_YT}/moodCategories`)

    }
    getAutocomplete(query : string) : Observable<string[]>{
        return this.http.get<string[]>(`${environment.API_BASE_URL_YT}/autoComplete?query=${query}`)
    }
    getAlbun(brosewId:string | undefined){
        if(brosewId == undefined){
            return new Observable();
        }
        return this.http.get(`${environment.API_BASE_URL_YT}/album?browseId=${brosewId}`)
    }
    getPlaylist(browsedId:string | undefined): Observable<DtoPlaylist>{
        if(browsedId == undefined){
            return new Observable();
        }
        return this.http.get<DtoPlaylist>(`${environment.API_BASE_URL_YT}/playlist?browseId=${browsedId}`)
    }

    getPodcasts(query: string): Observable<DTOsearch[]>{
      return this.http.get<DTOsearch[]>(`${environment.API_BASE_URL_YT}/posdcast?query=${query}`)
    }

    checkStatus(){
        return this.http.get(`${environment.API_BASE_URL_YT}/status`).subscribe((res) => {
            console.log(res);
        })
    }
}
