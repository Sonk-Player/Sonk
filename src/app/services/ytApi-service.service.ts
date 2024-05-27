import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { DtoSongConcrete } from '../models/DTO/DtoSongConcrete';
import { Observable } from 'rxjs';
import { DtoSong } from '../models/DTO/DtoSuggestion';
import { DTOsearch } from '../models/DTO/DtoSearch';

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
        console.log(videoId)
        const url = `${environment.API_BASE_URL_YT}/song?songId=${videoId}`
        console.log(url)
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
    search(query : string): Observable<DTOsearch[]>{
        if(query == undefined){
            return new Observable<DTOsearch[]>();
        }
        const url = `${environment.API_BASE_URL_YT}/search?query=${query}`
        return this.http.get<DTOsearch[]>(url)
    }
}