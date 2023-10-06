export function dateCount(pickUpDate: string, dropDate: string): number {

  const [datePart1] = pickUpDate.split(" ");
  const [datePart2] = dropDate.split(" ");

  var startDate: Date = new Date(datePart1);
  var endDate: Date = new Date(datePart2);

  const timeDifference: number = endDate.getTime() - startDate.getTime();

  const daysDifference: number = timeDifference / (1000 * 60 * 60 * 24);
  return Math.abs(daysDifference);
}
