import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Card, CardContent, Typography, TextField, Button, Grid, CircularProgress, IconButton, Avatar } from '@mui/material';
import { me, changePhoto, updateUser } from '../../features/userSlice';
import { notifySuccess, notifyError } from '../../components/Toast'; // Import the toast functions
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const Profile = () => {
  const dispatch = useDispatch();
  const [isDispatched, setIsDispatched] = useState(false);
  const user = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  const fileInputRef = useRef(null);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    if (!isDispatched) {
      dispatch(me());
      setIsDispatched(true);
    }
  }, [dispatch, isDispatched]);

  useEffect(() => {
    if (user?.data) {
      setUsername(user.data.username || '');
      setEmail(user.data.email || '');
    }
  }, [user]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    dispatch(changePhoto(formData))
      .then(() => {
        dispatch(me());
        notifySuccess('Profile photo updated successfully!');
      })
      .catch((error) => {
        console.error('Error changing photo:', error);
        notifyError(error.message || 'Failed to update profile photo. Please try again later.');
      });
  };

  const handleUpdatePhoto = () => {
    fileInputRef.current.click();
  };

  const handleUpdateProfile = () => {
    if (user?.data?._id) {
      setUpdateLoading(true);
      dispatch(updateUser({ userId: user.data._id, userData: { username, email } }))
        .unwrap() // Unwraps the result to handle both fulfilled and rejected actions
        .then(() => {
          notifySuccess('Profile updated successfully!');
          dispatch(me()); // Update the user data after successful update
        })
        .catch((error) => {
          console.error('Error updating profile:', error);
          notifyError(error.message || 'Failed to update profile. Please try again later.');
        })
        .finally(() => {
          setUpdateLoading(false);
        });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Card sx={{ width: '60%', maxWidth: 800 }}>
        <CardContent>
          <Typography variant="h4" component="div" sx={{ textAlign: 'center', marginBottom: 4, fontFamily: 'Poppins' }}>
            Profile
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
            <input
              ref={fileInputRef}
              style={{ display: 'none' }}
              id="upload-photo"
              name="upload-photo"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <IconButton color="primary" aria-label="upload picture" component="span" onClick={handleUpdatePhoto}>
              <Avatar
                key={user?.data?.profilePhoto?.url}
                src={user?.data?.profilePhoto?.url || ''}
                sx={{ width: 200, height: 200, backgroundColor: '#fff' }}
              />
            </IconButton>
            <PhotoCameraIcon fontSize="large" />
            <TextField
              label="Name"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ width: '70%' }}
            />
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ width: '70%' }}
            />
            {error && (
              <Typography variant="body2" color="error" sx={{ marginTop: 2 }}>
                {error}
              </Typography>
            )}
          </Box>
          <Grid container spacing={4} justifyContent="center" sx={{ marginTop: 4 }}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleUpdateProfile}
                disabled={loading || updateLoading}
                startIcon={updateLoading && <CircularProgress size={20} />}
              >
                Update
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="error" size="large">
                Delete
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
