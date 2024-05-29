import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Card, CardContent, Typography, TextField, Button, Grid, Avatar, IconButton } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { me, changePhoto } from '../../features/userSlice';
import { notifySuccess, notifyError } from '../../components/Toast'; // Import the toast functions

const Profile = () => {
  const dispatch = useDispatch();
  const [isDispatched, setIsDispatched] = useState(false);
  const user = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!isDispatched) {
      dispatch(me());
      setIsDispatched(true);
    }
  }, [dispatch, isDispatched]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    console.log('Selected file:', file);

    dispatch(changePhoto(formData))
  .then(() => {
    // After successfully changing the photo, refetch the user data
    dispatch(me());
    notifySuccess('Profile photo updated successfully!');
  })
  .catch((error) => {
    // Handle error
    console.error('Error changing photo:', error);
    notifyError(error.message || 'Failed to update profile photo. Please try again later.');
  })
  }

  const handleUpdatePhoto = () => {
    fileInputRef.current.click();
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
            <TextField label="Name" variant="outlined" value={user?.data?.username || ''} sx={{ width: '70%' }} />
            <TextField label="Email" variant="outlined" value={user?.data?.email || ''} sx={{ width: '70%' }} />
          </Box>
          <Grid container spacing={4} justifyContent="center" sx={{ marginTop: 4 }}>
            <Grid item>
              <Button variant="contained" color="primary" size="large" onClick={handleUpdatePhoto}>
                Update Photo
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
