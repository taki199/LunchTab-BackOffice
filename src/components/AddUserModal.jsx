import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { red, green } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';
import { createUser } from '../features/userSlice';

const AddUserModal = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedUserData = { ...userData, [name]: value };
    setUserData(updatedUserData);
  };

  const handleFormSubmit = () => {
    if (!userData.username) {
      console.log("Username is required");
      return;
    }
    dispatch(createUser(userData)).then(() => {
      setOpen(false);
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ borderBottom: '1px solid #e0e0e0' }}>
        <span style={{ flexGrow: 1 }}>Add User</span>
        <IconButton aria-label="close" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Username"
          type="text"
          fullWidth
          name="username"
          value={userData.username}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          name="password"
          value={userData.password}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions style={{ borderTop: '1px solid #e0e0e0' }}>
        <Button onClick={handleClose} style={{ color: red[500] }}>
          Cancel
        </Button>
        <Button onClick={handleFormSubmit} style={{ color: green[500] }}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserModal;
