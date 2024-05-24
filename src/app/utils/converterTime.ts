export function convertedTime(durationInSecond? : string){
    let secondsNumber = durationInSecond ? parseFloat(durationInSecond) : 0;
    
    const minutes = Math.floor(secondsNumber / 60).toFixed(0);
    const seconds = secondsNumber % 60;
   
    return `${minutes}:${seconds <= 9 ? '0' : ''}${seconds.toFixed(0)}`;
}