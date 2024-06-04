import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the necessary components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BasicChart = ({ orders }) => {
  const labels = orders.map(order => order.formattedCreatedAt);
  const data = orders.map(order => order.totalAmount);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Total Amount',
        data: data,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  return (
    <div style={{ height: '400px', width: '600px' }}>
      <Bar
        data={chartData}
        options={{
          scales: {
            x: {
              type: 'category', // Use 'category' for the x-axis scale
            },
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default BasicChart;
