import * as React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function DataPie({ series, fill, label, labels }) {
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "",
      },
      toolbar: {
        display: false,
      },
      legend: {
        position: "bottom" as const,
        display: true,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label,
        data: series,
        backgroundColor: fill,
      },
    ],
  };

  return <Pie data={data} options={options} />;
}

export default DataPie;
