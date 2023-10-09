export function dateCount(pickUpDate: string, dropDate: string): number {



  var startDate: Date = new Date(pickUpDate);
  var endDate: Date = new Date(dropDate);
  const timeDifference: number = endDate.getTime() - startDate.getTime();
  const daysDifference: number = timeDifference / (1000 * 60 * 60 * 24);
  return Math.abs(daysDifference);
}
