import React, { useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";

import useChartDataFormat from "../../hooks/useChartDataFormat";
import useDateTree from "../../hooks/useDateTree";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const skipped = (ctx, value) =>
  ctx.p0.skip || ctx.p1.skip ? value : undefined;

const options = {
  responsive: true,
  maintainAspectRatio: false,

  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      beginAtZero: false,
      grace: 1,
    },
  },
  plugins: {
    legend: {
      position: "top",
      align: "end",
      onClick: null,
    },
    tooltip: {
      callbacks: {
        beforeTitle: function (context) {
          return "May";
        },
      },
    },
  },
  datasets: {
    line: {
      spanGaps: true,
      segment: {
        // borderColor: (ctx) => skipped(ctx, "rgba(53, 162, 235, 0.7)"),
        borderColor: (ctx) => skipped(ctx, "rgba(255, 99, 132, 07)"),
        borderDash: (ctx) => skipped(ctx, [6, 4]),
      },
      borderWidth: 2.5,
      pointRadius: 2.5,
      hoverRadius: 5,
    },
  },
};

function BarChart({ data }) {
  const [valueData, setValueData] = React.useState({
    datasets: [
      {
        data: [],
      },
    ],
  });

  const { dateTree } = useDateTree(data);
  const { chartDataFormat, formatData } = useChartDataFormat();

  React.useEffect(() => {
    if (data.length === 0) return;
    formatData(dateTree);
  }, [formatData, data, dateTree]);

  React.useEffect(() => {
    if (!chartDataFormat) return;
    // console.log(chartDataFormat);

    setValueData({
      labels: chartDataFormat.map((item) => item.x),

      datasets: [
        {
          label: "Body Temperature (°F)",
          data: chartDataFormat.map((item) => item.y),

          // maxBarThickness: 60,
          borderWidth: 0,
          // borderColor: "rgba(53, 162, 235, 0.7)",
          backgroundColor: "rgba(53, 162, 235, 0.7)",
          borderColor: "rgb(255, 99, 132)",
          // backgroundColor: "rgba(255, 99, 132, 0.8)",
          // pointBackgroundColor: "rgba(255, 99, 132, 1)",
          tooltip: {
            titleColor: "rgba(200, 162, 100, 0.7)",

            callbacks: {
              label: function (context) {
                let label = context.dataset.label || "";

                if (label) {
                  label = ": °F";
                }
                if (context.parsed.y !== null) {
                  label = "Average " + context.parsed.y + label;
                }
                return label;
              },
            },
          },
        },
      ],
    });
  }, [chartDataFormat]);

  if (data.length === 0) return <p>No Data</p>;

  return <Bar data={valueData} options={options}></Bar>;
}

export default BarChart;
