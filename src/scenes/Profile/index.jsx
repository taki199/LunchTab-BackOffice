import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { TextField, Button, Box, Grid, Avatar, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const Profile = () => {
  const handleImageChange = (event) => {
    // Handle image change logic here
    const file = event.target.files[0];
    // You can use this file for uploading
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
          <Typography variant="h4" component="div" sx={{ textAlign: 'center', marginBottom: 4, fontFamily:'poppins' }}>
            Profile
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
            <label htmlFor="upload-photo">
              <input
                style={{ display: 'none' }}
                id="upload-photo"
                name="upload-photo"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <IconButton color="primary" aria-label="upload picture" component="span">
                <Avatar sx={{ width: 200, height: 200, backgroundColor: '#fff' }}>
                  <AccountCircleIcon sx={{ width: 140, height: 140, color: '#3f51b5' }} />
                </Avatar>
              </IconButton>
              <PhotoCameraIcon fontSize="large"  />
            </label>
            <TextField label="Name" variant="outlined" defaultValue="John Doe" sx={{ width: '70%' }} />
            <TextField label="Email" variant="outlined" defaultValue="john.doe@example.com" sx={{ width: '70%' }} />
            <TextField label="Phone" variant="outlined" defaultValue="123-456-7890" sx={{ width: '70%' }} />
            {/* Add more profile details as needed */}
          </Box>
          <Grid container spacing={4} justifyContent="center" sx={{ marginTop: 4 }}>
            <Grid item>
              <Button variant="contained" color="primary" size="large">
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
