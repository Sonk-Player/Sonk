import { Thumbnail } from "../interfaces/thumails"

export interface DtoArtist {
    description: string
    views: string
    name: string
    channelId: string
    shuffleId: any
    radioId: any
    subscribers: string
    subscribed: boolean
    thumbnails: Thumbnail[]
    songs: Songs
    albums: Albums
    singles: Singles
    videos: Videos
    related: Related
  }



   interface Songs {
    browseId: string
    results: Result[]
  }

   interface Result {
    videoId: string
    title: string
    artists: Artist[]
    album: Album
    likeStatus: string
    inLibrary: any
    thumbnails: Thumbnail[]
    isAvailable: boolean
    isExplicit: boolean
    videoType: string
    views: string
  }

   interface Artist {
    name: string
    id: string
  }

   interface Album {
    name: string
    id: string
  }



   interface Albums {
    browseId: string
    results: Result2[]
    params: string
  }

   interface Result2 {
    title: string
    type: string
    year: string
    artists: any[]
    browseId: string
    audioPlaylistId: string
    thumbnails: Thumbnail[]
    isExplicit: boolean
  }



   interface Singles {
    browseId: string
    results: Result3[]
    params: string
  }

 interface Result3 {
    title: string
    year: string
    browseId: string
    thumbnails: Thumbnail[]
  }



   interface Videos {
    browseId: string
    results: Result4[]
    params: string
  }

   interface Result4 {
    title: string
    videoId: string
    artists: Artist2[]
    playlistId: string
    thumbnails: Thumbnail[]
    views: string
  }

   interface Artist2 {
    name: string
    id: string
  }



   interface Related {
    browseId: any
    results: Result[]
  }


