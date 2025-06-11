"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

ChartJS.register(
  CategoryScale,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function getDataForChart() {
  const days = getDaysFromMonth();
  const values = mergeMonthsExpensesToDays();

  return { days, values };
}

function mergeMonthsExpensesToDays() {
  return null;
}

function getDaysFromMonth() {
  return null;
}

export function ExpensesLineChart({
  maxValue,
  date,
}: {
  maxValue: number;
  date: Date;
}) {
  const labels = Array.from({ length: 30 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );

  console.log(date.getMonth());

  const datasets = Array.from({ length: 30 }, () =>
    Math.floor(Math.random() * 7001)
  );
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Wydatki",
        data: datasets,
        fill: false,
        borderColor: "#F83B3B",
        tension: 0.2,
      },
      // {
      //   label: "Wpływy",
      //   data: datasets,
      //   fill: false,
      //   borderColor: "#00000",
      //   tension: 0.3,
      // },
    ],
  };

  const options = {
    scales: {
      y: {
        title: {
          display: true,
        },
        display: true,
        min: 0,
        max: maxValue,
      },
      x: {
        title: {
          display: true,
        },
        display: true,
        ticks: {
          autoSkip: false,
        },
      },
    },
  };

  return (
    <div className="w-full bg-card rounded-lg ">
      <Line
        options={{
          ...options,
          responsive: true,
          maintainAspectRatio: false,
        }}
        data={data}
      />
    </div>
  );
}
