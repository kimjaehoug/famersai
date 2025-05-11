import React, { useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";

const SafeLineChart = ({ data, options }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    return () => {
      if (chartRef.current && chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
    };
  }, [data]);

  return <Line ref={chartRef} data={data} options={options} />;
};

export default SafeLineChart;