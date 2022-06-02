import * as React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart({ data, labels, height = 200 }) {
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
        position: "top" as const,
        display: false,
      },
    },
  };

  const alldata = {
    labels,
    datasets: data,
  };
  return <Bar options={options} data={alldata} height={height} />;
}

export default BarChart;
