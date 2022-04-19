import * as React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
    },
    toolbar: {
      display: true,
    },
  },
};

function DoughnutChart({ data }) {
  const alldata = {
    datasets: [
      {
        data,
        backgroundColor: ["#006993", "#C4C4C4", "#FFC423"],
      },
    ],
  };

  return <Doughnut data={alldata} options={options} />;
}

export default DoughnutChart;
