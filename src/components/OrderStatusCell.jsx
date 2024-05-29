import React, { useEffect, useState } from "react";
import { Box, Select, MenuItem,useTheme } from "@mui/material";

const OrderStatusCell = ({ orderId, currentStatus, onStatusChange }) => {
  const [localStatus, setLocalStatus] = useState(currentStatus);
  const theme = useTheme();

  useEffect(() => {
    setLocalStatus(currentStatus);
  }, [currentStatus]);

  const handleChange = (event) => {
    const newStatus = event.target.value;
    setLocalStatus(newStatus);
    onStatusChange(orderId, newStatus);
  };

  let bgColor;
  let textColor = 'white';

  switch (localStatus) {
    case 'Pending':
      bgColor = '#FFA500'; // Orange
      break;
    case 'Preparing':
      bgColor = '#8B4513'; // Brown
      break;
    case 'Out for Delivery':
      bgColor = '#FFD700'; // Yellow
      textColor = 'black'; // Better contrast with yellow background
      break;
    case 'Delivered':
      bgColor = '#4CAF50'; // Green
      break;
    case 'failed':
      bgColor = '#FF0000'; // Red
      break;
    default:
      bgColor = 'grey'; // Default case
      break;
  }

  return (
    <Box
      sx={{
        bgcolor: bgColor,
        padding: '8px 16px',
        maxHeight: '35px',
        borderRadius: '20px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        maxWidth: '130px',
        margin: '4px',
      }}
       style={{ color:textColor }}
    
    >
      <Select
        value={localStatus}
        onChange={handleChange}
        variant="standard"
        disableUnderline
        sx={{
          color: textColor,
          '& .MuiSelect-icon': {
            color: textColor,
          },
        }}
      >
        <MenuItem value="Pending">Pending</MenuItem>
        <MenuItem value="Preparing">Preparing</MenuItem>
        <MenuItem value="Out for Delivery">Out for Delivery</MenuItem>
        <MenuItem value="Delivered">Delivered</MenuItem>
        <MenuItem value="failed">Failed</MenuItem>
      </Select>
    </Box>
  );
};

export default OrderStatusCell;
