import React from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; // Import Chart directly from chart.js/auto

const LineChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.monthYear),
    datasets: [
      {
        label: 'Total Sales',
        data: data.map(item => item.totalSales),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'category',
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default LineChart;
