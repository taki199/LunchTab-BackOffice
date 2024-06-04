import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchAllOrders } from '../features/orderSlice';
import { useDispatch, useSelector } from 'react-redux';

const MonthlyOrdersChart = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.order);
  const error = useSelector((state) => state.order.error);
  const [monthlyOrders, setMonthlyOrders] = useState([]);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  useEffect(() => {
    const calculateMonthlyOrders = () => {
      const monthlyOrdersMap = new Map();

      orders.forEach(order => {
        const createdAt = new Date(order.createdAt);
        const month = createdAt.toLocaleString('default', { month: 'short' });
        const year = createdAt.getFullYear();
        const monthYear = `${month} ${year}`;

        if (monthlyOrdersMap.has(monthYear)) {
          monthlyOrdersMap.set(monthYear, monthlyOrdersMap.get(monthYear) + 1);
        } else {
          monthlyOrdersMap.set(monthYear, 1);
        }
      });

      const monthlyOrdersData = Array.from(monthlyOrdersMap, ([monthYear, totalOrders]) => ({ monthYear, totalOrders }));
      setMonthlyOrders(monthlyOrdersData);
    };

    if (orders.length > 0) {
      calculateMonthlyOrders();
    }
  }, [orders]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={monthlyOrders} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="monthYear" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalOrders" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthlyOrdersChart;
