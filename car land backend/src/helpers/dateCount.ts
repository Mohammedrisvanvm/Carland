export function dateCount(pickUpDate: string, dropDate: string): number {
  var date1: Date = new Date(pickUpDate);
  var date2: Date = new Date(dropDate);

  var Difference_In_Time: number = date2.getTime() - date1.getTime();

  var Difference_In_Days: number = Difference_In_Time / (1000 * 3600 * 24);
  return Difference_In_Days;
}
