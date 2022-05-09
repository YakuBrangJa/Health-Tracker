import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { red } from "@mui/material/colors";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const skipped = (ctx, value) =>
  ctx.p0.skip || ctx.p1.skip ? value : undefined;

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      align: "end",
      onClick: null,
    },
    tooltip: {
      padding: 8,
      animation: {
        transform: false,
      },
      // borderColor: "red",
    },
  },
  fill: true,
  layout: {
    padding: 0,
  },
  datasets: {
    line: {
      spanGaps: true,
      segment: {
        borderColor: (ctx) => skipped(ctx, "rgba(255, 99, 132, 0.8)"),
        borderDash: (ctx) => skipped(ctx, [6, 4]),
      },
      borderWidth: 2.5,
      pointRadius: 2.5,
      hoverRadius: 5,
    },
  },
  scales: {
    y: {
      beginAtZero: false,
      grace: 1,
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
  // "2022 Jan",
  // "Feb",
  // "Mar",
  // "Apr",
  // "May",
  // "Jun",
  // "Jul",
  // "Aug",
  // "Sep",
  // "Oct",
  // "Nov",
  // "Dec",
];

// const down = (ctx, value) =>
//   ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined;
let dataTest1 = [40, 45, NaN, 43, 55, 39, 37, 47, 50, 40, 45];
let dataTest2 = [12, 23, NaN, 10, 55, 20, 17, 13, 23, 20, 15];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: dataTest2,
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      pointBackgroundColor: "rgba(255, 99, 132, 1)",
    },
    // {
    //   label: "Dataset 2",
    //   data: [12, 10, undefined, 10, undefined, 30, 20, 29, 13, 23, 4, 3],
    //   borderColor: "rgb(53, 162, 235)",
    //   backgroundColor: "rgba(53, 162, 235, 0.5)",
    // },
  ],
};

export function DemoChart() {
  return <Line height="auto" width="auto" options={options} data={data} />;
}
