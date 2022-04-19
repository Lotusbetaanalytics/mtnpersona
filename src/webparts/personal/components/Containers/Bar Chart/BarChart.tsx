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

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "",
    },
    toolbar: {
      display: true,
    },
  },
};

const labels = ["Staff Surveys"];

function BarChart({ data }) {
  const alldata = {
    labels,
    datasets: [
      {
        label: "All Surveys",
        data: data.numberofSurvey,
        backgroundColor: "rgba(255, 196, 35, 1)",
      },
      {
        label: "Rejected Surveys",
        data: data.rejected,
        backgroundColor: "#006993",
      },
      {
        label: "Pending Surveys",
        data: data.pending,
        backgroundColor: "#C4C4C4",
      },
    ],
  };
  return <Bar options={options} data={alldata} />;
}

export default BarChart;
