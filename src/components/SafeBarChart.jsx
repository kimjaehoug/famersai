// components/SafeBarChart.jsx
import React from "react";
import { Bar } from "react-chartjs-2";

const SafeBarChart = ({ data, options }) => {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default SafeBarChart;