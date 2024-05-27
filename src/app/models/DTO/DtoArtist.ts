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
  
  export interface Thumbnail {
    url: string
    width: number
    height: number
  }
  
  export interface Songs {
    browseId: string
    results: Result[]
  }
  
  export interface Result {
    videoId: string
    title: string
    artists: Artist[]
    album: Album
    likeStatus: string
    inLibrary: any
    thumbnails: Thumbnail2[]
    isAvailable: boolean
    isExplicit: boolean
    videoType: string
    views: string
  }
  
  export interface Artist {
    name: string
    id: string
  }
  
  export interface Album {
    name: string
    id: string
  }
  
  export interface Thumbnail2 {
    url: string
    width: number
    height: number
  }
  
  export interface Albums {
    browseId: string
    results: Result2[]
    params: string
  }
  
  export interface Result2 {
    title: string
    type: string
    year: string
    artists: any[]
    browseId: string
    audioPlaylistId: string
    thumbnails: Thumbnail3[]
    isExplicit: boolean
  }
  
  export interface Thumbnail3 {
    url: string
    width: number
    height: number
  }
  
  export interface Singles {
    browseId: string
    results: Result3[]
    params: string
  }
  
  export interface Result3 {
    title: string
    year: string
    browseId: string
    thumbnails: Thumbnail4[]
  }
  
  export interface Thumbnail4 {
    url: string
    width: number
    height: number
  }
  
  export interface Videos {
    browseId: string
    results: Result4[]
    params: string
  }
  
  export interface Result4 {
    title: string
    videoId: string
    artists: Artist2[]
    playlistId: string
    thumbnails: Thumbnail5[]
    views: string
  }
  
  export interface Artist2 {
    name: string
    id: string
  }
  
  export interface Thumbnail5 {
    url: string
    width: number
    height: number
  }
  
  export interface Related {
    browseId: any
    results: Result5[]
  }
  
  export interface Result5 {
    title: string
    browseId: string
    subscribers: string
    thumbnails: Thumbnail6[]
  }
  
  export interface Thumbnail6 {
    url: string
    width: number
    height: number
  }
  