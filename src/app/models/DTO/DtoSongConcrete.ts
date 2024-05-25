export interface DtoSongConcrete {
    title: string
    videoId: string
    chanelId: string
    author: string
    allowRatings: boolean
    thumbnails: Thumbnail[]
    durationSeconds: string
    viewCount: string

  }
  
  export interface Thumbnail {
    url: string
    width: number
    height: number
  }
  