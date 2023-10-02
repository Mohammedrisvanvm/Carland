export function dateCount(pickUpDate:string,dropDate:string):number {
    var date1:Date = new Date(pickUpDate);
        var date2:Date = new Date(dropDate);
          
      
        var Difference_In_Time = date2.getTime() - date1.getTime();
        console.log(typeof(Difference_In_Time));
          
        
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      return Difference_In_Days
    }