export interface DtoMoodCategories {
    "Moods & moments": Moment[]
    Genres: Genre[]
  }
  
  export interface Moment {
    title: string
    params: string
  }
  
  export interface Genre {
    title: string
    params: string
  }
  