import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { DtoSong } from '../models/DTO/DtoSong';
import { Observable } from 'rxjs';
import { DtoSuggestion } from '../models/DTO/DtoSuggestion';

@Injectable({
    providedIn: 'root'
})
export class YtApiServiceService {

    constructor(private http: HttpClient){
    }



    getSong(videoId: string) : Observable<DtoSong>{
        const url = `${environment.API_BASE_URL_YT}/song?songId=${videoId}`
        console.log(url)
        return this.http.get<DtoSong>(url)
    }
    getSuggestions(name: string): Observable<DtoSuggestion[]>{
        const url = `${environment.API_BASE_URL_YT}/getSuggestions?name=${name}`
        return this.http.get<DtoSuggestion[]>(url)
        
    }


}