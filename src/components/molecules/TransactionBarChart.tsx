"use client";
import { Member } from "@/features/members/components/Member";
import { CategoryWithTransactions } from "@/global/types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

function assignTransactionPricesToMembers(
  members: Member[],
  categories: CategoryWithTransactions
) {
  const labels = members.map((m) => m.name);
  const dataMap: Record<string, number> = {};

  members.forEach((member) => {
    dataMap[member.id] = 0;
  });

  categories.forEach((category) => {
    category.transactions.forEach((transaction) => {
      for (const member of transaction.members) {
        const memberId = member.memberId;
        if (
          dataMap[memberId] !== undefined &&
          transaction.price !== undefined
        ) {
          dataMap[memberId] += transaction.price;
        }
      }
    });
  });
  const dataForChart = members.map((member) => dataMap[member.id]);

  return { labels, dataForChart };
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function TransactionBarChart({
  maxValue,
  members,
  categories,
  title,
}: {
  maxValue: number;
  members: Member[];
  categories: CategoryWithTransactions;
  title: string;
}) {
  const { labels, dataForChart } = assignTransactionPricesToMembers(
    members,
    categories
  );

  const data = {
    labels: labels,
    datasets: [
      {
        label: title,
        data: dataForChart,
        backgroundColor: ["#7047EBBF", "#7047EBBF", "#7047EBBF"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: true },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: false,
        },
      },
      y: {
        min: 0,
        max: maxValue,
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="h-full">
      <Bar data={data} options={options} />
    </div>
  );
}
