import React from "react";
import { Bar, Line } from "react-chartjs-2";

import useChartDataFormat from "../../hooks/useChartDataFormat";
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

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function BarChart({ data }) {
  const [valueData, setValueData] = React.useState({
    labels: labels,

    datasets: [
      {
        label: "Body Mass Index",
        data: [],
        borderWidth: 2,
        borderColor: "rgba(53, 162, 235, 0.7)",
        backgroundColor: "rgba(53, 162, 235, 0.7)",
      },
    ],
  });

  const { chartDataFormat, formatData } = useChartDataFormat();
  React.useEffect(() => {
    if (data.length === 0) return;
    formatData(data, "DAY");
  }, [formatData, data]);

  React.useEffect(() => {
    if (!chartDataFormat) return;
    console.log(chartDataFormat);

    setValueData({
      labels: chartDataFormat.map((item) => item.x),

      datasets: [
        {
          label: "Body Temperature (°F)",
          data: chartDataFormat.map((item) => item.y),

          // maxBarThickness: 60,
          borderWidth: 2,
          // borderColor: "rgba(53, 162, 235, 0.7)",
          // backgroundColor: "rgba(53, 162, 235, 0.7)",
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
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

  return <Line data={valueData} options={options}></Line>;
}

export default BarChart;
