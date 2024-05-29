import { Thumbnail } from "../interfaces/thumails"

export interface DtoPlaylist {
    id: string
    owned: boolean
    privacy: string
    title: string
    thumbnails: Thumbnail[]
    description: any
    author: Author
    year: string
    views: number
    duration: string
    trackCount: number
    related: any[]
    tracks: Track[]
    duration_seconds: number
  }



 interface Author {
    name: string
    id: string
  }

 export interface Track {
    videoId?: string
    title: string
    artists: Artist[]
    album: any
    likeStatus?: string
    inLibrary: any
    thumbnails: Thumbnail[]
    isAvailable: boolean
    isExplicit: boolean
    videoType?: string
    views: any
    duration: string
    duration_seconds: number
  }

 interface Artist {
    name: string
    id?: string
  }

