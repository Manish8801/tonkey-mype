import { Line } from "react-chartjs-2";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Graph = () => {
  const data = {
    labels: [15], // x-axis time in seconds
    datasets: [
      {
        fill: false,
        label: "Errors",
        pointStyle: "crossRot",
        pointRadius: 3,
        borderWidth: 2,
        showLine: false,
        borderColor: "#FF5733",
        pointBackgroundColor: "#ff5733",
        data: [4],
        yAxisId: "y1",
      },
      {
        tension: 0.4,
        fill: true,
        label: "WPM",
        data: [120],
        borderColor: "#e2b714",
        backgroundColor: "#ff0000",
        pointBackgroundColor: "#e2b714",
        yAxisId: "y",
      },
      {
        label: "Raw",
        fill: true,
        yAxisId: "y",
        tension: 0.4,
        boxPadding: 0,
        borderColor: "#646669",
        backgroundColor: "--graph-b",
        usePointStyle: true,
        pointBackgroundColor: "#646669",
        data: [150],
      },
    ],
  };

  const options = {
    type: "logarithmic",
    responsive: true,
    aspectRatio: 5,
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
        min : 1,
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
          color: "#646669" as const,
          font: {
            size: 14,
          },
        },
        grid: {
          display: true,
          color: "rgba(0,0,0,.1)" as const,
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
          text: "Words per minute" as const, // Label for left y-axis
        },
        ticks: {
          maxTicksLimit: 4,
          color: "#646669" as const,
        },
        grid: {
          color: "rgba(0,0,0,.1)" as const,
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
          text: "Errors" as const,
        },
        ticks: {
          maxTicksLimit: 2,
          color: "#646669" as const,
        },
        grid: {
          drawOnChartArea: false,
          color: "rgba(0,0,0,0.1)" as const,
        },
      },
    },
  };

  return (
    <div className="col-span-9">
      <Line options={options} data={data} />
    </div>
  );
};

export default Graph;
