import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import useGameStore from "../../../zustand/useGameStore";
import { getNumArr } from "../../../utils/helper";

Chart.register(...registerables);

const Graph = () => {
  const { result } = useGameStore();
  const seconds = getNumArr(result?.timeInSec || 10);
  const wpmSpeed = result?.wpmSpeed || [];
  const rawSpeed = result?.rawSpeed || [];
  const errors = result?.wrongCharCounts || [];
  const errorIndexes = result?.firstWrongIndexes || [];

  console.log(result);
  const data = {
    labels: seconds, // x-axis time in seconds
    datasets: [
      {
        label: "Errors",
        data: errorIndexes,
        borderColor: "#FF5733",
        yAxisId: "y1",
        showLine: false,
        pointStyle: "crossRot",
        pointRadius: 3.5,
        borderWidth: 2,
        pointBackgroundColor: "#ff5733",
      },
      {
        label: "WPM",
        data: wpmSpeed,
        borderColor: "#e2b714",
        yAxisId: "y",
        tension: 0.4,
        pointBackgroundColor: "#e2b714",
        borderWidth: 3,
        pointRadius: 2,
      },
      {
        label: "Raw",
        data: rawSpeed,
        borderColor: "#646669",
        yAxisId: "y",
        fill: true,
        tension: 0.4,
        backgroundColor: "rgba(0,0,0,.3)",
        usePointStyle: true,
        pointBackgroundColor: "#646669",
        borderWidth: 3,
        pointRadius: 2,
      },
    ],
  };

  const options = {
    aspectRatio: 4,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
        callbacks: {
          label: function (context: any) {
            const dataIndex = context.dataIndex;

            const label = context.dataset.label || "";
            const value = context.raw || 0;
            if (label === "Errors" && value && errors[dataIndex]) {
              return `${label}: ${errors[dataIndex]}`;
            }

            return `${label}: ${value}`;
          },
        },
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleColor: "#fff",
        bodyColor: "#fff",
        displayColors: true,
        bodyFont: {
          weight: 600,
        },
      },
    },
    scales: {
      y: {
        type: "linear" as const,
        position: "left" as const,
        title: {
          font: {
            weight: 800,
          },
          align: "center" as const,
          display: true,
          text: "Words per minute", // Label for left y-axis
        },
        ticks: {
          maxTicksLimit: 5,
          color: "#646669",
        },
      },
      y1: {
        grid: {
          drawOnChartArea: false,
        },
        type: "linear" as const,
        position: "right" as const,
        title: {
          font: {
            weight: 800,
          },
          align: "center" as const,
          display: true,
          text: "Errors",
        },
        ticks: {
          maxTicksLimit: 5,
          color: "#646669",
          beginAtZero: true,
        },
      },
    },
  };

  return <Line options={options} data={data} />;
};

export default Graph;
