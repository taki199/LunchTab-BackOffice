import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import Header from '../../components/Header';
import MonthlyOrdersChart from '../../components/MonthlyOrdersChart';

const Monthly = () => {
  const theme = useTheme();

  return (
    <Box m="20px">
      <Header title="Monthly Orders" subtitle="Overview of orders by month" />
      <Box mt="20px" p="20px">
        <Typography variant="h6" fontWeight="bold" mb="10px">
          Monthly Orders Chart
        </Typography>
        <MonthlyOrdersChart />
      </Box>
    </Box>
  );
};

export default Monthly;
