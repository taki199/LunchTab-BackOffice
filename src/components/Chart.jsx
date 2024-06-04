import React from 'react';
import { Doughnut, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components with Chart.js
ChartJS.register(ArcElement, Title, Tooltip, Legend);

const BasicChart = ({ orders, chartType }) => {
  // Filter orders based on status
  const filterOrdersByStatus = (status) => {
    return orders.filter(order => order.orderStatus=== status);
  };

  // Data generation function for Doughnut and Pie Charts
  const generateChartData = () => {
    const statusLabels = ['failed', 'Preparing', 'Out for Delivery', 'Delivered', 'Pending'];
    const data = {
      labels: statusLabels,
      datasets: [{
        label: 'Order Status',
        data: statusLabels.map(status => filterOrdersByStatus(status).length),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      }],
    };

    return data;
  };

  // Select the appropriate chart based on chartType
  const ChartComponent = chartType === 'doughnut' ? Doughnut : Pie;

  return (
    <div style={{ height: '400px', width: '400px' }}>
      <ChartComponent
        data={generateChartData()}
        options={{
          maintainAspectRatio: false,
          responsive: true,
        }}
      />
    </div>
  );
};

export default BasicChart;
