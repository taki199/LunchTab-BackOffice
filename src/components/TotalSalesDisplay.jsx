import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const TotalSalesDisplay = ({ totalSales }) => {
  const [currentSales, setCurrentSales] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = totalSales;
    const duration = 3000; // Animation duration in milliseconds
    const range = end - start;
    let startTime;

    const animationFrame = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      setCurrentSales(Math.floor(progress * range + start));

      if (progress < 1) {
        requestAnimationFrame(animationFrame);
      }
    };

    requestAnimationFrame(animationFrame);

    return () => {
      // Clean up animation if component unmounts
      cancelAnimationFrame(animationFrame);
    };
  }, [totalSales]);

  return (
    <Box>
      <Typography variant="h6">Total Sales</Typography>
      <Typography variant="h4">${currentSales}</Typography>
    </Box>
  );
};

export default TotalSalesDisplay;
