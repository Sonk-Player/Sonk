import { Thumbnail } from "../interfaces/thumails"

export interface DtoSongConcrete {
    title: string
    videoId: string
    chanelId: string
    author: string
    allowRatings: boolean
    thumbnails: Thumbnail[]
    durationSeconds: string
    viewCount: string
    urlEmbedded: string
    description: string
  }

