import { Line } from "react-chartjs-2";
import {
  Filler,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import useGameStore from "../../../zustand/useGameStore";
import { getNumArr } from "../../../utils/helper";
import { useEffect, useRef } from "react";
import { getErrArr } from "../../../utils/game.utils";

ChartJS.register(
  Filler,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Graph = () => {
  const { result, isGameOver } = useGameStore();
  const time = useRef<number[]>([]);
  const wpm = useRef<number[]>([]);
  const raw = useRef<number[]>([]);
  const errors = useRef<number[]>([]);

  useEffect(() => {
    if (result) {
      time.current = getNumArr(result.time);
      wpm.current = getNumArr(result.wpm);
      raw.current = getNumArr(result.raw);
      errors.current = getErrArr(result.errors);
    }
  }, [isGameOver]);

  const data = {
    labels: time.current, // x-axis time in seconds
    datasets: [
      {
        label: "Errors",
        pointStyle: "crossRot",
        pointRadius: 3,
        borderWidth: 2,
        showLine: false,
        borderColor: "#FF5733",
        pointBackgroundColor: "#ff5733",
        data: errors.current,
        yAxisId: "y1",
      },
      {
        tension: 0.4,
        label: "WPM",
        borderColor: "#e2b714",
        backgroundColor: "rgba(0,0,0,.3)",
        pointBackgroundColor: "#e2b714",
        yAxisId: "y",
        data: wpm.current,
      },
      {
        label: "Raw",
        yAxisId: "y",
        fill: true,
        tension: 0.4,
        boxPadding: 0,
        borderColor: "#646669",
        backgroundColor: "rgba(0,0,0,.3)",
        usePointStyle: true,
        pointBackgroundColor: "#646669",
        data: raw.current,
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
            const label = context.dataset.label || "";
            const value = context.raw || 0; // Data value
            return `${label}: ${value}`;
          },
        },
        backgroundColor: "rgba(0, 0, 0, 0.7)", // Tooltip background color
        titleColor: "#fff" as const, // Tooltip title text color
        bodyColor: "#fff" as const, // Tooltip body text color
        displayColors: true, // Show color indicators in tooltip
        bodyFont: {
          weight: "bold" as const,
        },
      },
    },
    scales: {
      x: {
        type: "linear" as const,
        title: {
          font: {
            weight: "bold" as const,
            size: 16,
          },
          align: "center" as const,
          display: true,
          text: "Time (seconds)", // Label for the x-axis
        },

        ticks: {
          maxTicksLimit: 15,
          color: "#646669",
          font: {
            size: 14,
          },
        },
        grid: {
          display: true,
          color: "rgba(0,0,0,.1)",
        },
      },
      y: {
        type: "linear" as const,
        position: "left" as const,

        title: {
          font: {
            weight: "bold" as const,
            size: 16,
          },
          align: "center" as const,
          display: true,
          text: "Words per minute", // Label for left y-axis
        },
        ticks: {
          maxTicksLimit: 5,
          color: "#646669" as const,
        },
        grid: {
          color: "rgba(0,0,0,.1)",
        },
      },
      y1: {
        type: "linear" as const,
        position: "right" as const,
        title: {
          font: {
            weight: "bold" as const,
            size: 16,
          },
          align: "center" as const,
          display: true,
          text: "Errors",
        },
        ticks: {
          maxTicksLimit: 2,
          color: "#646669",
        },
        grid: {
          drawOnChartArea: false,
          color: "rgba(0,0,0,0.1)",
        },
      },
    },
  };

  return <Line options={options} data={data} />;
};

export default Graph;
