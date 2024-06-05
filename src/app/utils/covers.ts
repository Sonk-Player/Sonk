import { DTOsearch } from "../models/DTO/DtoSearch";
import { Thumbnail } from "../models/interfaces/thumails";


function getCoverMaxSize(search: Thumbnail[] ) {
  if (search === undefined || search.length === 0) {
    return "../../../../assets/img/noSong.webp";
  }
  let urlMax = "";

  if(search[search.length-1].url === undefined){
    urlMax = search[0].url;
  }else{
    urlMax = search[search.length-1].url;
  }

  return urlMax;
}

function getCoverMinSize(search: Thumbnail[]) {
  if (search === undefined) {
    return "../../../../assets/img/noSong.webp";
  }
  let urlMax = "";

  return search[0].url;
}


function  setErrorCover(id:string) {
  document.getElementById(id)?.setAttribute('src', '../../../../assets/img/noSong.webp');
}



export { getCoverMinSize , getCoverMaxSize , setErrorCover }
