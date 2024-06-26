import React, { useState, useEffect } from 'react';
import { Drawer, Box, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Divider } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
    SettingsOutlined,
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    Groups2Outlined,
    ReceiptLongOutlined,
    PublicOutlined,
    PointOfSaleOutlined,
    TodayOutlined,
    CalendarMonthOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutlined,

  } from "@mui/icons-material";
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import FlexBetween from './FlexBetween';
import profileImage from "../assets/profile.jpg";
import { useSelector } from 'react-redux';
import Logo from './Logo'
import PsychologyIcon from '@mui/icons-material/Psychology';

const navItems = [
    {
      text: "Dashboard",
      icon: <HomeOutlined />,
    },
    
    {
      text: "Products",
      icon: <ShoppingCartOutlined />,
    },
    {
      text: "Customers",
      icon: <Groups2Outlined />,
    },
    {
        text: "Orders",
        icon: <InventoryOutlinedIcon />,
      },
    {
        text: "Category",
        icon: <CategoryOutlinedIcon />,
      },

    {
      text: "Transactions",
      icon: <ReceiptLongOutlined />,
    },
   
    {
      text: "Overview",
      icon: <PointOfSaleOutlined />,
    },
    {
      text: "Daily",
      icon: <TodayOutlined />,
    },
    {
      text: "Ai",
      icon: <PsychologyIcon />,
    },
    {
      text: "Monthly",
      icon: <CalendarMonthOutlined />,
    },
    {
      text: "Breakdown",
      icon: <PieChartOutlined />,
    },
    
    {
      text: "Admin",
      icon: <AdminPanelSettingsOutlined />,
    },
  ];

const Sidebar = ({ drawerWidth, isSidebarOpen, setIsSidebarOpen, isNonMobile }) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const user = useSelector((state) => state.user.user || {}); // Access user data from Redux store, initialize with empty object if not available
  const navigate = useNavigate();
  const theme = useTheme();
  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  // Default user data if not available from the Redux store
  const defaultUser = {
    username: "Guest",
    profilePhoto: { url: "default-profile-image.jpg" },
    role: "Guest",
  };

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
             
            },
          }}
        >
          <Box width="100%" marginTop={"-20px"}>
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" >
                  
                    <Logo/>
                  
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon }, index) => {
                const lcText = text.toLowerCase();
                const isActive = active === lcText;
                const isCentered = ["Sales", "Management", "Client Facing"].includes(text);

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor: isActive ? theme.palette.secondary[500] : "transparent",
                        "&:hover": {
                          backgroundColor: isActive ? theme.palette.secondary[500] : "transparent",
                        },
                        textAlign: isCentered ? "center" : "left",
                        justifyContent: isCentered ? "center" : "flex-start",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: isCentered ? "auto" : "2rem",
                          color: isActive ? theme.palette.common.white : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={text}
                        sx={{ color: isActive ? theme.palette.common.white : theme.palette.secondary[100] }}
                      />
                      {isActive && <ChevronRightOutlined sx={{ ml: "auto", color: theme.palette.common.white }} />}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          <Box position="absolute" bottom="2rem">
            <Divider />
            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
              <Box
                component="img"
                alt="profile"
                src={(user.profilePhoto && user.profilePhoto.url) || defaultUser.profilePhoto.url} // Use user profile photo if available, otherwise default
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {(user.username) || defaultUser.username} {/* Display user name */}
                </Typography>
                <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  Admin
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: "25px",
                }}
              />
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
}

export default Sidebar;
