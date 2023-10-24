export interface IdashboardDetails {
    data:Array<Idata>,
    resultArray:Array<number>
 
}
interface Idata{
    totalAmountCompleted: number;
    totalOrders: number;
    totalUsers: number;
    totalCancelled: number;
    totalOngoing: number;
    totalPickup: number;
    totalPickUpreq: number;
    totalDropOffReq: number;
}
