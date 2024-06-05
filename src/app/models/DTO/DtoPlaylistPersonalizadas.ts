export interface Playlistpersonalizadas {
    _id:          string;
    playlistId:   string;
    userId:       string;
    playlistName: string;
    __v:          number;
}

export interface songsBD {
  playlistId: string;
  userId: string
  videoId: string;
  img: string;
  title: string;
  artist: string;
  duration: string;
}
