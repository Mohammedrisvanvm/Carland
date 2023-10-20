export function dateCount(pickUpDate: Date, dropDate: Date): number {

  const timeDifference: number = pickUpDate.getTime() - dropDate.getTime();
  const daysDifference: number = timeDifference / (1000 * 60 * 60 * 24);
  return Math.abs(daysDifference);
}
