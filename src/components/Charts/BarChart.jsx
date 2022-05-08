import React from "react";
import { Bar } from "react-chartjs-2";

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
        tooltip: {
          titleColor: "rgba(200, 162, 100, 0.7)",

          callbacks: {
            label: function (context) {
              let label = context.dataset.label || "";

              if (label) {
                label = "BMI: ";
              }
              if (context.parsed.y !== null) {
                label += context.parsed.y;
              }
              return label;
            },
          },
        },
      },
    ],
  });

  const { chartDataFormat, formatData } = useChartDataFormat();
  React.useEffect(() => {
    if (data.length === 0) return;
    formatData(data, "MONTH");
  }, [formatData, data]);

  React.useEffect(() => {
    if (!chartDataFormat) return;
    console.log(chartDataFormat);

    setValueData({
      labels: chartDataFormat.map((item) => item.x),

      datasets: [
        {
          label: "Body Mass Index",
          data: chartDataFormat.map((item) => item.y),

          // maxBarThickness: 60,
          borderWidth: 2,
          borderColor: "rgba(53, 162, 235, 0.7)",
          backgroundColor: "rgba(53, 162, 235, 0.7)",
        },
      ],
    });
  }, [chartDataFormat]);

  if (data.length === 0) return <p>No Data</p>;

  return <Bar data={valueData} options={options}></Bar>;
}

export default BarChart;
