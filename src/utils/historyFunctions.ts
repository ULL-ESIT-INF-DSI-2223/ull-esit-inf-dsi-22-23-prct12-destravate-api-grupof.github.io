import { Schema } from "mongoose";
export function historyFunction(historicTracks: any): number []{
  
  
  // Obtén la fecha actual y calcula las fechas de inicio para la semana, el mes y el año pasado
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);

  const result: number[] = [0,0,0,0,0,0]
  const cont: number[] = [0,0,0]
  historicTracks.forEach((track: any) => {
    // Convierte la fecha de la pista en un objeto Date
    const trackDate = new Date(track.date);
    
    // Comprueba si la pista es de la semana pasada
    if (trackDate > oneWeekAgo) {
      result[0] += track.track.long;
      result[1] += track.track.unevenness;
      cont[0]++;
      }
      
      if (trackDate > oneMonthAgo) {
        result[2] += track.track.long;
        result[3] += track.track.unevenness;
        cont[1]++;
        }
        if (trackDate > oneYearAgo) {
          result[4] += track.track.long;
          result[5] += track.track.unevenness;
          cont[2]++;  
        }
     });

     result[1] /= cont[0];
     result[3] /= cont[1];
     result[5] /= cont[2];
  return result;

}

export function favoriteRoutes(historicTracks: any): {id: string, name: string, count: number }[] {
  const routeCounts: { [key: string]: number } = {};

  historicTracks.forEach((track: any) => {
    const trackId = track.track.toString();
    if (routeCounts.hasOwnProperty(trackId)) {
      routeCounts[trackId]++;
    } else {
      routeCounts[trackId] = 1;
    }
  });

  const sortedRoutes = Object.entries(routeCounts).sort(
    ([, countA], [, countB]) => countB - countA
  );

  const topRoutes = sortedRoutes.map(([trackId, count]) => {
    const track = historicTracks.find((track: any) => track.track.toString() === trackId);
    const name = track ? track.track.name : "Unknown"; // Obtener el nombre de la ruta
    const id = track ? track.track.id : "Unknown"; // Obtener el nombre de la ruta
    return {id, name, count };
  });

  return topRoutes;
}

export function activeChallenges(challenges: any, id: string) {
   //Buscar en el campo users los ids que coincidan con el id recibido
   const result: {_id: Schema.Types.ObjectId, id: string, name: string} [] = [];
  challenges.forEach((challenge: any) => {
    challenge.users.forEach((user: any) => {
      if(user._id == id){
        result.push({_id: challenge._id.toString(), id: challenge.id, name: challenge.name});
      }
    })
  })
  return result;

}

export function challengeLong() {
  //Buscar e
}