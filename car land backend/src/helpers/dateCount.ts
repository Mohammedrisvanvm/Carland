export function dateCount(pickUpDate: Date, dropDate: Date): number {

  const timeDifference: number =  dropDate.getTime()-pickUpDate.getTime()

  const daysDifference: number = timeDifference / (1000 * 60 * 60 * 24);
  console.log(daysDifference,timeDifference);
  
  return Math.round(daysDifference)
}
