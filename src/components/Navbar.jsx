import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LightModeOutlined, DarkModeOutlined, Menu as MenuIcon, Search, SettingsOutlined, ArrowDropDownOutlined } from '@mui/icons-material';
import FlexBetween from './FlexBetween';
import { setMode } from '../state';
import { AppBar, IconButton, InputBase, Toolbar, useTheme, Box, Menu, MenuItem, Button, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { updateUser, logoutUser } from '../features/userSlice'; // Import `updateUser` and `logoutUser` actions
import { useNavigate } from 'react-router-dom';
import { notifySuccess, notifyError } from '../components/Toast'; // Import the toast functions

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const [anchorEl, setAnchorEl] = useState(null);
    const [active, setActive] = useState("");
    const isOpen = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const theme = useTheme();
    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate(); // Access the navigate function

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    const defaultUser = {
        username: "Guest",
        profilePhoto: { url: "default-profile-image.jpg" },
        role: "Guest",
    };

    const handleUserUpdate = (updatedUser) => {
        notifySuccess('Logged out successfully'); // Show success toast after logging out

        dispatch(updateUser(updatedUser));
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        notifySuccess('Logged out successfully'); // Show success toast after logging out

        navigate('/login'); // Redirect to the login page after logout

        // Additional logic for redirecting or showing a message after logout can be added here
    };

    return (
        <AppBar
            sx={{
                position: "static",
                background: "none",
                boxShadow: "none",
            }}
        >
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <FlexBetween>
                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        <MenuIcon />
                    </IconButton>
                    <FlexBetween
                        backgroundColor={theme.palette.background.alt}
                        borderRadius="9px"
                        gap="3rem"
                        p="0.1rem 1.5rem"
                    >
                        <InputBase placeholder="Search..." />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                </FlexBetween>
                <FlexBetween gap="1.5rem">
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === "light" ? (
                            <DarkModeOutlined sx={{ fontSize: "25px" }} />
                        ) : (
                            <LightModeOutlined sx={{ fontSize: "25px" }} />
                        )}
                    </IconButton>
                    <IconButton>
                        <SettingsOutlined sx={{ fontSize: "25px" }} />
                    </IconButton>
                    <FlexBetween>
                        <Button
                            onClick={handleClick}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                textTransform: "none",
                                gap: "1rem",
                            }}
                        >
                            <Box
                                component="img"
                                alt="profile"
                                src={(user && user.profilePhoto && user.profilePhoto.url) || defaultUser.profilePhoto.url}
                                height="32px"
                                width="32px"
                                borderRadius="50%"
                                sx={{ objectFit: "cover" }}
                            />
                            <Box textAlign="left">
                                <Typography
                                    fontWeight="bold"
                                    fontSize="0.85rem"
                                    sx={{ color: theme.palette.secondary[100] }}
                                >
                                    {(user && user.username) || defaultUser.username}
                                </Typography>
                                <Typography
                                    fontSize="0.75rem"
                                    sx={{ color: theme.palette.secondary[200] }}
                                >
                                    Admin
                                </Typography>
                            </Box>
                            <ArrowDropDownOutlined
                                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
                            />
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={isOpen}
                            onClose={handleClose}
                            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                        >
                            <MenuItem component={Link} to="/profile/me">Profile</MenuItem>
                            <MenuItem onClick={handleLogout}>Log Out</MenuItem> {/* Call handleLogout when Log Out is clicked */}
                        </Menu>
                    </FlexBetween>
                </FlexBetween>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
