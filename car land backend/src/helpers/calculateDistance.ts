export function calculateDistance(lat1:number, lon1:number, lat2:number, lon2:number):number {
    const R:number = 6371; 
    const dLat :number= (lat2 - lat1) * (Math.PI / 180);
    const dLon:number = (lon2 - lon1) * (Math.PI / 180);
    const a:number =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c:number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance:number = R * c; 

    return Number(distance.toFixed(2)); 
  }