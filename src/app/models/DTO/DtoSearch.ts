import { Thumbnail } from "../interfaces/thumails"


export interface DTOsearch {
  category?: string
  resultType: string
  subscribers?: string
  artists?: Artist[]
  thumbnails: Thumbnail[]
  title?: string
  album?: Album
  inLibrary?: boolean
  feedbackTokens?: FeedbackTokens
  videoId?: string
  videoType?: string
  duration?: string
  year?: string
  duration_seconds?: number
  isExplicit?: boolean
  type?: string
  browseId?: string
  views?: string
  itemCount?: string
  author?: string
  artist?: string 
  shuffleId?: string
  radioId?: string
  playlistId?: string
}

export interface Artist {
  name: string
  id?: string
}


export interface Album {
  name: string
  id: string
}

export interface FeedbackTokens {
  add: any
  remove: any
}
