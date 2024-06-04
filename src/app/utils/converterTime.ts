export function convertedTime(durationInSecond? : string){
    let secondsNumber = durationInSecond ? parseFloat(durationInSecond) : 0;
    const horas = Math.floor(secondsNumber / 3600).toFixed(0);
    const minutes = Math.floor(secondsNumber % 3600 / 60).toFixed(0);
    const seconds = secondsNumber % 60;
    

    // const minutes = Math.floor(secondsNumber / 60).toFixed(0);
    // const seconds = secondsNumber % 60;
    
    const result = +horas > 0 ? `${horas}:${+minutes <= 9 ? '0' : ''}${minutes}:${seconds <= 9 ? '0' : ''}${seconds.toFixed(0)}` : `${minutes}:${seconds <= 9 ? '0' : ''}${seconds.toFixed(0)}`;

    return result;
}