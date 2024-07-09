import React from "react";
import PieChart from "./PieChart";
import BarChart from "./BarChart";

function Chart() {
  return (
    <div className="flex px-10 mt-10 flex-col justify-between   items-center ">
      <PieChart />
      <BarChart />
    </div>
  );
}

export default Chart;
