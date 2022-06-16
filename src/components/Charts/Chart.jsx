import React, { useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useSelector } from "react-redux";

import "./Chart.css";

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

function Chart({ data, formOpen, type, chartConfig }) {
  const [valueData, setValueData] = React.useState({
    datasets: [
      {
        data: [],
      },
    ],
  });

  const { dateTree } = useDateTree(data);
  const { chartDataFormat, formatData } = useChartDataFormat();
  const activeDateTab = useSelector((state) => state.dateNav.activeTabState);
  const unitState = useSelector((state) => state.formState.unitState);
  const { year, month, day, day14, week } = useSelector(
    (state) => state.activeData.activeDate
  );
  const typeStyleConfig = useSelector((state) => state.sideBar.browse);

  const matchedType = typeStyleConfig.find(
    (item) => item.route.replace("/", "") === type
  );

  const { windowWidth, darkTheme } = useSelector((state) => state.uiState);

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
        grid: {
          display: true,
          color: darkTheme ? "#4445" : "#4443",
          tickWidth: 0,
        },
      },
      y: {
        stacked: false,
        beginAtZero: chartConfig.multiValue,
        grace: 1,
        grid: {
          display: true,
          color: darkTheme ? "#4445" : "#4443",
          tickWidth: 0,
        },
      },
      // xAxes: [
      //   {
      //     ticks: {
      //       autoSkip: false,
      //       minRotation: 0,
      //       maxRotation: 0,
      //     },
      //   },
      // ],
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
            if (activeDateTab === "D") return `${year} ${month}${day}`;
            if (activeDateTab === "W") return year;
            if (activeDateTab === "14D") return year;
            if (activeDateTab === "M") return `${year} ${month}`;
            if (activeDateTab === "Y") return year;
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
        borderColor: matchedType.color + `${darkTheme ? "aa" : "ff"}`,
        backgroundColor: matchedType.color + "ff",
        pointBackgroundColor: matchedType.color + "ff",
        spanGaps: true,
        segment: {
          borderColor: (ctx) => skipped(ctx, matchedType.color + "aa"),
          borderDash: (ctx) => skipped(ctx, [4, 3]),
        },
        borderWidth: windowWidth < 576 ? 2 : 2.5,
        pointRadius: 2.5,
        hoverRadius: windowWidth < 576 ? 3.5 : 5,
      },
      bar: {
        backgroundColor: matchedType.color + `${darkTheme ? "99" : "aa"}`,
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

export default Chart;
