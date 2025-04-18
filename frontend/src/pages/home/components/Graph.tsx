import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import useGameStore from "../../../zustand/useGameStore";
import { getNumArr } from "../../../utils/helper";

Chart.register(...registerables);

const Graph = () => {
  const { result, session } = useGameStore();
  const seconds = getNumArr(session);
  const errorsCountArr = result?.errorsCountArr || [];
  const errors =
    result?.errorsCountArr.map((item) => (item !== null ? item[0] : null)) ||
    [];
  const wpm = result?.wpmSpeed || [];
  const raw = result?.rawSpeed || [];

  console.log(errors);

  const data = {
    labels: seconds, // x-axis time in seconds
    datasets: [
      {
        label: "Errors",
        data: errors,
        borderColor: "#FF5733",
        yAxisId: "y1",
        showLine: false,
        pointStyle: "crossRot",
        pointRadius: 3,
        borderWidth: 2,
        pointBackgroundColor: "#ff5733",
      },
      {
        label: "WPM",
        data: wpm,
        borderColor: "#e2b714",
        yAxisId: "y",
        tension: 0.4,
        pointBackgroundColor: "#e2b714",
        borderWidth: 2,
      },
      {
        label: "Raw",
        data: raw,
        borderColor: "#646669",
        yAxisId: "y",
        fill: true,
        tension: 0.4,
        backgroundColor: "rgba(0,0,0,.3)",
        usePointStyle: true,
        pointBackgroundColor: "#646669",
        borderWidth: 2,
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
        mode: "index",
        intersect: false,
        callbacks: {
          label: function (context: any) {
            const dataIndex = context.dataIndex;
            
            const label = context.dataset.label || "";
            const value = context.raw || 0;
            if (label === "Errors" && value && errorsCountArr[dataIndex]) {
              
              return `${label}: ${errorsCountArr[dataIndex].length}`
            } 
            
            return `${label}: ${value}`;
          },
        },
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleColor: "#fff",
        bodyColor: "#fff",
        displayColors: true,
        bodyFont: {
          weight: "bold",
        },
      },
    },
    scales: {
      y: {
        type: "linear",
        position: "left",
        title: {
          font: {
            weight: "bold",
            size: 16,
          },
          align: "center",
          display: true,
          text: "Words per minute", // Label for left y-axis
        },
        ticks: {
          maxTicksLimit: 4,
          color: "#646669",
        },
      },
      y1: {
        grid: {
          drawOnChartArea: false,
        },
        type: "linear",
        position: "right",
        title: {
          font: {
            weight: "bold",
          },
          align: "center",
          display: true,
          text: "Errors",
        },
        ticks: {
          maxTicksLimit: 4,
          color: "#646669",
          beginAtZero: true,
        },
        min: 0,
        max: Math.max(...errors.filter((item) => item !== null)),
      },
    },
  };

  return <Line options={options} data={data} />;
};

export default Graph;
