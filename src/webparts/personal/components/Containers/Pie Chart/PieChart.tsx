import * as React from "react";
import { VictoryPie, VictoryTooltip } from "victory";

const PieChart = ({ data }) => {
  return (
    <VictoryPie
      data={data}
      colorScale={["#006993", "#C4C4C4", "#FFC423"]}
      radius={100}
      style={{ labels: { fontSize: "12px" } }}
      labelComponent={
        <VictoryTooltip
          cornerRadius={({ datum }) => datum.x * 2}
          flyoutStyle={{ fontSize: "12px" }}
        />
      }
    />
  );
};

export default PieChart;
