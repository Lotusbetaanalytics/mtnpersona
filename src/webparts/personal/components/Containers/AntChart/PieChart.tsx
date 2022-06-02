import * as React from "react";
import ReactECharts from "echarts-for-react";

export const AntPieChart = ({ data, label, title }) => {
  const option = {
    title: {
      text: title,
      x: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      center: "center",
      y: "bottom",
      data: label,
    },
    series: [
      {
        name: "Employees",
        type: "pie",
        radius: "55%",
        center: ["50%", "50%"],
        data,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
          labelLine: {
            show: false,
          },
          label: {
            show: true,
            position: "inner",
          },
        },
      },
    ],
  };

  return (
    <>
      <ReactECharts
        option={option}
        style={{ height: "400px", width: "500px" }}
      />
    </>
  );
};

export const AntBarChart = ({ data, label, title }) => {
  const option = {
    title: {
      text: title,
    },
    tooltip: {},
    legend: {
      data: [title],
    },
    xAxis: {
      data: label,
    },
    yAxis: {},
    series: [
      {
        name: title,
        type: "bar",
        data,
      },
    ],
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: "400px", width: "500px" }}
      opts={{ renderer: "svg" }}
    />
  );
};
