import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebook, FaGoogle, FaTwitter } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../features/userSlice';
import Message from '../../components/ErrorMessage';
import coverImage from '../../assets/laun1.png'; // Adjust the import path as needed
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { Box, Button, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import { notifySuccess, notifyError } from '../../components/Toast';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const { user, status } = useSelector((state) => state.user);

  useEffect(() => {
    // Check if user is already logged in
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await dispatch(fetchUser(credentials)).unwrap();
      if (user) {
        notifySuccess('Login successful!');
        navigate('/dashboard');
      } else {
        notifyError('Invalid credentials');
      }
    } catch (error) {
      notifyError('Login failed. Please try again.');
    }
  };

  return (
    <Box sx={{
      backgroundColor: '#f0f0f0',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px',
      border: '2px solid #ddd',
      borderRadius: '10px',
    }}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{
          padding: '40px',
          border: '2px solid #ddd',
          borderRadius: '10px',
        }}>
          <Box sx={{
            textAlign: 'center',
            mb: 4,
          }}>
            <img src={coverImage} alt='Logo' width={120} height={100} />
          </Box>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Sign in to Your Account
          </Typography>
          <Message type={message ? (message.startsWith('Login successful') ? 'success' : 'error') : ''} message={message} />
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="standard"
                  margin="normal"
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  InputProps={{
                    startAdornment: <EmailIcon />,
                    sx: {
                      '&:focus': {
                        outline: 'none',
                      },
                      '&:hover': {
                        border: '1px solid #333',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="standard"
                  margin="normal"
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  InputProps={{
                    startAdornment: <LockIcon />,
                    sx: {
                      '&:focus': {
                        outline: 'none',
                      },
                      '&:hover': {
                        border: '1px solid #333',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                  }}
                >
                  Sign In
                </Button>
              </Grid>
            </Grid>
          </form>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Link to="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="#" variant="body2">
                Need an account? Sign Up
              </Link>
            </Grid>
          </Grid>
          <Box sx={{
            mt: 3,
          }}>
            <Typography variant="body2" color="textSecondary" align="center">
              Or sign in with
            </Typography>
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 1,
            }}>
              <Button variant="outlined" size="large" startIcon={<FaFacebook />} sx={{
                mr: 1,
              }}>Facebook</Button>
              <Button variant="outlined" size="large" startIcon={<FaGoogle />} sx={{
                mr: 1,
              }}>Google</Button>
              <Button variant="outlined" size="large" startIcon={<FaTwitter />} >Twitter</Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
