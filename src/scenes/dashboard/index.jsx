import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, useTheme } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import BasicChart from '../../components/BasicChart';
import Header from "../../components/Header";
import { fetchAllOrders } from '../../features/orderSlice';
import { countOrder } from '../../api/orderApi';
import { countDish } from '../../api/dishApi'; // Correctly import countDish function
import { useDispatch, useSelector } from 'react-redux';
import Chart from '../../components/Chart';
import TotalSalesDisplay from '../../components/TotalSalesDisplay';
import LineChart from '../../components/LineChartt';

const Dashboard = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [totalOrders, setTotalOrders] = useState(0);
  const [monthlySales, setMonthlySales] = useState([]);
  const [dishCount, setDishCount] = useState(0);
  const [animatedDishCount, setAnimatedDishCount] = useState(0);

  const { orders, loading } = useSelector((state) => state.order);
  const error = useSelector((state) => state.order.error);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  useEffect(() => {
    const fetchTotalOrders = async () => {
      try {
        const count = await countOrder();
        setTotalOrders(count);
      } catch (error) {
        console.error('Error fetching total orders count:', error);
      }
    };

    fetchTotalOrders();
  }, []);

  useEffect(() => {
    const fetchDishCount = async () => {
      try {
        const count = await countDish();
        setDishCount(count);
      } catch (error) {
        console.error('Error fetching dish count:', error);
      }
    };

    fetchDishCount();
  }, []);

  useEffect(() => {
    let interval;
    if (dishCount > 0) {
      let count = 0;
      interval = setInterval(() => {
        count += 1;
        setAnimatedDishCount(count);
        if (count >= dishCount) {
          clearInterval(interval);
        }
      }, 50); // Adjust the speed of the animation by changing the interval duration
    }
    return () => clearInterval(interval);
  }, [dishCount]);

  useEffect(() => {
    const calculateMonthlySales = () => {
      const monthlySalesMap = new Map();

      orders.forEach(order => {
        const createdAt = new Date(order.createdAt);
        const monthYear = `${createdAt.getMonth() + 1}/${createdAt.getFullYear()}`;
        const totalAmount = order.totalAmount;

        if (monthlySalesMap.has(monthYear)) {
          monthlySalesMap.set(monthYear, monthlySalesMap.get(monthYear) + totalAmount);
        } else {
          monthlySalesMap.set(monthYear, totalAmount);
        }
      });

      const monthlySalesData = Array.from(monthlySalesMap, ([monthYear, totalSales]) => ({ monthYear, totalSales }));
      setMonthlySales(monthlySalesData);
    };

    if (orders.length > 0) {
      calculateMonthlySales();
    }
  }, [orders]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const totalSales = orders.reduce((acc, order) => acc + order.totalAmount, 0);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Button
          sx={{
            backgroundColor: theme.palette.mode === "dark" ? theme.palette.primary[400] : theme.palette.secondary[400],
            color: theme.palette.mode === "dark" ? theme.palette.grey[100] : theme.palette.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
        >
          <DownloadOutlinedIcon sx={{ mr: "10px" }} />
          Download Reports
        </Button>
      </Box>

      {/* GRID & CHARTS */}
      <Box mt="20px" display="flex" justifyContent="space-between">
        {/* Left Side: Total Sales Chart and Summary Boxes */}
        <Box width="48%">
          <Typography variant="h6" mb="10px" fontWeight='bold'>
            Total Sales Chart
          </Typography>
          <BasicChart orders={orders} />

          {/* Total Sales Display */}
          <Box
            mt="20px"
            backgroundColor={theme.palette.mode === "dark" ? theme.palette.primary[400] : "black"}
            width='100%'
            height='100px'
            borderRadius="8px"
            p="20px"
            display="flex"
            alignItems="center"
          >
            <Box>
              <Typography variant="h5" fontWeight="bold" color={theme.palette.mode === "light" ? theme.palette.white[700] : theme.palette.grey[100]}>
                Revenue Generated
              </Typography>
              <Typography variant="h3" fontWeight="bold" color={theme.palette.mode === "dark" ? theme.palette.green[500] : theme.palette.white[700]}>
                <TotalSalesDisplay totalSales={totalSales} />
              </Typography>
            </Box>
          </Box>

          {/* Total Orders Display */}
          <Box
            mt="20px"
            backgroundColor={theme.palette.mode === "dark" ? theme.palette.primary[400] : "black"}
            width='100%'
            height='100px'
            borderRadius="8px"
            p="20px"
            display="flex"
            alignItems="center"
          >
            <Box>
            <Typography variant="h5" fontWeight="bold" color={theme.palette.mode === "light" ? theme.palette.white[700] : theme.palette.grey[100]}>
                Total Orders
              </Typography>
              <Typography variant="h3" fontWeight="bold" color={theme.palette.mode === "dark" ? theme.palette.green[500] : theme.palette.white[700]}>
                {totalOrders}
              </Typography>
            </Box>
          </Box>

          {/* Total Dishes Display */}
          <Box
            mt="20px"
            backgroundColor={theme.palette.mode === "dark" ? theme.palette.primary[400] : "black"}
            width='100%'
            height='100px'
            borderRadius="8px"
            p="20px"
            display="flex"
            alignItems="center"
          >
            <Box>
            <Typography variant="h5" fontWeight="bold" color={theme.palette.mode === "light" ? theme.palette.white[700] : theme.palette.grey[100]}>
                Total Dishes
              </Typography>
              <Typography variant="h3" fontWeight="bold" color={theme.palette.mode === "dark" ? theme.palette.green[500] : theme.palette.white[700]}>
                {animatedDishCount}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Right Side: Order Status Chart and Monthly Sales Chart */}
        <Box width="48%">
          <Typography variant="h6" mb="10px" fontWeight='bold'>
            Order Status Chart
          </Typography>
          <Chart orders={orders} chartType="doughnut" />

          <Box mt="20px">
            <Typography variant="h6" mb="10px" fontWeight='bold'>
              Monthly Sales Chart
            </Typography>
            <LineChart data={monthlySales} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
