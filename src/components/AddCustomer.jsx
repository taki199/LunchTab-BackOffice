import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCustomer } from '../features/customerSlice';
import { Box, Modal, TextField, Button } from '@mui/material';

const CustomerModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateCustomer = () => {
    const newCustomerData = {
      username,
      email,
      password,
    };
    dispatch(createCustomer(newCustomerData));
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box 
        sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          width: 400, 
          bgcolor: 'background.paper', 
          boxShadow: 24, 
          p: 4 
        }}
      >
        <h2>Add Customer</h2>
        <TextField 
          fullWidth 
          label="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          margin="normal"
        />
        <TextField 
          fullWidth 
          label="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          margin="normal"
        />
        <TextField 
          fullWidth 
          label="Password" 
          type="password"
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          margin="normal"
        />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleCreateCustomer} 
          sx={{ mt: 2 }}
        >
          Add Customer
        </Button>
      </Box>
    </Modal>
  );
};

export default CustomerModal;
