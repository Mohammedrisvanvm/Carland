import React, { FC } from "react";
import Chart from "react-apexcharts";

type Iprops = {
  categories: Array<string>;
  data: Array<number>;
};
export const DistributedChart: FC<Iprops> = ({ categories, data }) => {
    console.log(data);
    
  const [chartData, setChartData] = React.useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories,
      },
    },
    series: [
      {
        name: "data",
        data,
      },
    ],
  });

  return (
    <div className="mt-5 flex justify-center border rounded-lg shadow-md p-5">
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        width="700"
      />
    </div>
  );
};
