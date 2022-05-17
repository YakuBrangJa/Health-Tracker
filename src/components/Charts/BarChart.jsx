import React, { useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useSelector } from "react-redux";

import "./barChart.css";

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

function BarChart({ data, formOpen, chartConfig }) {
  const [valueData, setValueData] = React.useState({
    datasets: [
      {
        data: [],
      },
    ],
  });

  const { dateTree } = useDateTree(data);
  const { chartDataFormat, formatData } = useChartDataFormat();
  const unitState = useSelector((state) => state.formState.unitState);

  useEffect(() => {
    if (data.length === 0) return;
    formatData(dateTree, chartConfig.multiValue);
  }, [formatData, data, dateTree, chartConfig]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: false,
        beginAtZero: chartConfig.multiValue,
        grace: 1,
      },
    },
    plugins: {
      legend: {
        position: "top",
        align: "start",
        onClick: null,
        reverse: true,
      },
      tooltip: {
        callbacks: {
          beforeTitle: function (context) {
            return "June";
          },
          label: function (context) {
            let label = context.dataset.label || "";

            if (label) {
              label = ` ${unitState.symbol}`;
            }
            if (context.parsed.y !== null) {
              label = "Average: " + context.parsed.y + label;
            }
            return label;
          },
        },
      },
    },
    datasets: {
      line: {
        spanGaps: true,
        segment: {
          borderColor: (ctx) => skipped(ctx, "rgba(255, 99, 132)"),
          borderDash: (ctx) => skipped(ctx, [6, 4]),
        },
        borderWidth: 2.5,
        pointRadius: 2.5,
        hoverRadius: 5,
      },
    },
  };

  React.useEffect(() => {
    if (!chartDataFormat) return;

    let dataForMapping;

    if (chartConfig.multiValue) {
      dataForMapping = {
        labels: chartDataFormat.map((item) => item.x),

        datasets: chartConfig.config.map((item) => {
          return {
            data: chartDataFormat.map((value) =>
              value.y === null ? null : value.y[item.path]
            ),
            ...item,
          };
        }),
      };
    }

    if (!chartConfig.multiValue) {
      dataForMapping = {
        labels: chartDataFormat.map((item) => item.x),

        datasets: [
          {
            data: chartDataFormat.map((item) => item.y),
            ...chartConfig.config,
          },
        ],
      };
    }

    setValueData(dataForMapping);
  }, [chartDataFormat, chartConfig]);

  if (data.length === 0)
    return (
      <button type="button" className="empty-chart__button" onClick={formOpen}>
        <span>Add Data</span>
        <AddRoundedIcon className="icon" />
      </button>
    );

  if (chartConfig.type === "line")
    return <Line data={valueData} options={options}></Line>;

  if (chartConfig.type === "bar")
    return <Bar data={valueData} options={options}></Bar>;
}

export default BarChart;
