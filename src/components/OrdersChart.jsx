import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from "@mui/material";
import BasicChart from './BasicChart';
import { fetchAllOrders } from '../features/orderSlice';

const OrdersChart = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const chartData = {
    labels: orders.map(order => order._id), // Assuming _id is unique for each order
    datasets: [
      {
        label: 'Total Amount',
        data: orders.map(order => order.totalAmount),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  return (
    <Box m="20px">
      <BasicChart chartData={chartData} />
    </Box>
  );
};

export default OrdersChart;
