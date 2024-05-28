import { DTOsearch } from "../models/DTO/DtoSearch";

function getCoverPlaylists(search: DTOsearch) {
  if (search.thumbnails === undefined) {
    return "../../../../assets/img/noSong.webp";
  }
  let urlMax = "";

  search.thumbnails.forEach((thumbnail) => {
    if (thumbnail.width > 200) {
      urlMax = thumbnail.url;
    }
  });
  return urlMax;
}

function getCoverArtists(search: DTOsearch) {
  if (search.thumbnails === undefined) {
    return "../../../../assets/img/noSong.webp";
  }
  let urlMax = "";

  search.thumbnails.forEach((thumbnail) => {
    if (thumbnail.width < 200) {
      urlMax = thumbnail.url;
    }
  });
  return urlMax;
}


export { getCoverArtists, getCoverPlaylists }
