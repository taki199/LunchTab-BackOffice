    import React from 'react';
    import { Box, Typography, TextField, Button, IconButton, Link } from '@mui/material';
    import { useTheme } from '@mui/material/styles';
    import LockIcon from '@mui/icons-material/Lock'; // Icon for password
    import { Link as RouterLink } from 'react-router-dom';

    const LoginPage = () => {
    const theme = useTheme();

    return (
        <Box
        className="login_container"
        sx={{
            width: '100%',
            minHeight: '100vh',
            backgroundColor: theme.palette.common.white,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 20px',
        }}
        >
        <Box className="login_form_container" sx={{
            width: '900px',
            height: '500px',
            display: 'flex',
            borderRadius: '10px',
            boxShadow: `0px 3px 3px -2px ${theme.palette.grey[300]}, 0px 3px 4px 0px ${theme.palette.grey[300]}, 0px 1px 8px 0px ${theme.palette.grey[300]}`,
        }}>
            <Box className="left" sx={{
            flex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.palette.common.white,
            borderTopLeftRadius: '10px',
            borderBottomLeftRadius: '10px',
            padding: '0 40px',
            }}>
            <Box className="form_container" sx={{ display: 'grid', gap: '20px' }}>
                <Typography variant="h4" color="primary" gutterBottom>
                Login
                </Typography>
                <TextField
                label="Username"
                variant="outlined"
                fullWidth
                className="input"
                InputProps={{ style: { borderRadius: '10px', border: `1px solid ${theme.palette.grey[300]}` } }}
                />
                <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                className="input"
                InputProps={{ style: { borderRadius: '10px', border: `1px solid ${theme.palette.grey[300]}` } }}
                />
                <Button variant="contained" color="primary" fullWidth component={RouterLink} to="/dashboard">
                Login
                </Button>
                <Link component={RouterLink} to="/forgot-password" variant="body2" sx={{ color: theme.palette.primary.main }}>
                Forgot password?
                </Link>
            </Box>
            </Box>
            <Box className="right" sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.palette.secondary.main,
            borderTopRightRadius: '10px',
            borderBottomRightRadius: '10px',
            padding: '0 40px',
            }}>
            <Typography variant="h4" color="white" gutterBottom>
            LaunchTab
            </Typography>
            <Typography variant="body1" color="white" paragraph>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptate possimus quas!
            </Typography>
            </Box>
        </Box>
        {/* Logo */}
        <IconButton
            sx={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            color: theme.palette.success.main,
            }}
        >
            {/* Replace 'Logo' with your logo component or image */}
            LaunchTab
        </IconButton>
        </Box>
    );
    }

    export default LoginPage;
