import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchAllOrders } from '../features/orderSlice';
import { fetchAllCustomers } from '../features/customerSlice';
import { useDispatch, useSelector } from 'react-redux';

const DailyDataChart = () => {
  const dispatch = useDispatch();
  const { orders, loading: ordersLoading } = useSelector((state) => state.order);
  const {customers, loading: customersLoading } = useSelector((state) => state.customer);
  const [dailyOrders, setDailyOrders] = useState([]);
  const [dailyCustomers, setDailyCustomers] = useState([]);

  useEffect(() => {
    dispatch(fetchAllOrders());
    dispatch(fetchAllCustomers());
  }, [dispatch]);

  useEffect(() => {
    const calculateDailyCustomers = () => {
        if (!customers) return;

        const dailyCustomersMap = new Map();

        customers.data.forEach(customer => {
            const createdAt = new Date(customer.createdAt);
            const date = createdAt.toLocaleDateString(); // Extract the date
            const count = dailyCustomersMap.get(date) || 0;
            dailyCustomersMap.set(date, count + 1);
        });

        const dailyCustomersData = Array.from(dailyCustomersMap, ([date, count]) => ({ date, count }));
        console.log('Daily Customers Data:', dailyCustomersData);

        setDailyCustomers(dailyCustomersData);
    };

    if (customers && customers.data.length > 0) {
        console.log('Fetched customers:', customers.data);
        calculateDailyCustomers();
    }
}, [customers]);

  


  useEffect(() => {
    const calculateDailyOrders = () => {
        console.log("all costumers",customers.data)
      const dailyOrdersMap = new Map();

      orders.forEach(order => {
        const createdAt = new Date(order.createdAt);
        const date = createdAt.toLocaleDateString();
        const count = dailyOrdersMap.get(date) || 0;
        dailyOrdersMap.set(date, count + 1);
      });

      const dailyOrdersData = Array.from(dailyOrdersMap, ([date, count]) => ({ date, count }));
      setDailyOrders(dailyOrdersData);
    };

    if (orders.length > 0) {
      calculateDailyOrders();
    }
  }, [orders]);

  if (ordersLoading || customersLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Daily Orders Chart */}
      <h2 style={{ marginBottom: '20px' }}>Daily Orders</h2>
      <ResponsiveContainer width="90%" height={400}>
        <BarChart data={dailyOrders}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#82ca9d" name="Orders" />
        </BarChart>
      </ResponsiveContainer>

      {/* Daily Customers Chart */}
      <h2 style={{ marginTop: '40px', marginBottom: '20px' }}>Daily Customers</h2>
      <ResponsiveContainer width="90%" height={400}>
        <BarChart data={dailyCustomers}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" name="Customers" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailyDataChart;
