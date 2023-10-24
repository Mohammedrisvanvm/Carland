import React from "react";
import Chart from "react-apexcharts";
export const DistributedChart = () => {
    const [chartData, setChartData] = React.useState({
        options: {
          chart: {
            id: "basic-bar"
          },
          xaxis: {
            categories: ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep" ,"oct","nov","dec"]
          }
        },
        series: [
          {
            name: "revenue",
            data: [30, 40, 45, 50, 49, 60, 70, 91]
          }
        ]
      });
    
      return (
       <div className="mt-10 flex justify-center">
              <Chart
                options={chartData.options}
                series={chartData.series}
                type="bar"
                width="600"
              />
              </div>
        
      );
    };


