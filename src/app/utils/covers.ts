import { DTOsearch } from "../models/DTO/DtoSearch";
import { Thumbnail } from "../models/thumails";


function getCoverMaxSize(search: Thumbnail[]) {
  if (search === undefined) {
    return "../../../../assets/img/noSong.webp";
  }
  let urlMax = "";

  search.forEach((thumbnail) => {
    if (thumbnail.width > 200) {
      urlMax = thumbnail.url;
    }
  });
  return urlMax;
}

function getCoverMinSize(search: Thumbnail[]) {
  if (search === undefined) {
    return "../../../../assets/img/noSong.webp";
  }
  let urlMax = "";

  search.forEach((thumbnail) => {
    if (thumbnail.width < 200) {
      urlMax = thumbnail.url;
    }
  });
  return urlMax;
}


function  setErrorCover(id:string) {
  document.getElementById(id)?.setAttribute('src', '../../../../assets/img/noSong.webp');
}

export { getCoverMinSize as getCoverArtists, getCoverMaxSize as getCoverPlaylists, setErrorCover }
