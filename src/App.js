import React, { useEffect, useMemo } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { themeSettings } from "./theme";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./scenes/layout";
import Dashboard from "./scenes/dashboard";
import Login from "./scenes/login";
import Admin from './scenes/admin';
import { fetchUser } from "./features/userSlice";
import Orders from "./scenes/orders";


function App() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if user data is stored in localStorage
    const userData = localStorage.getItem('userData');
    if (userData) {
      // Dispatch action to set user data from localStorage to the store
      dispatch(fetchUser(JSON.parse(userData)));
    }
  }, [dispatch]);

  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
  <Route element={<Login />} path="/login" />
  <Route element={<ProtectedRoute />}>
    <Route path="/" element={<Navigate to="/dashboard" replace />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/admin" element={<Admin />} />
    <Route path="/orders" element={<Orders />} /> {/* Add the Orders route */}
  </Route>
</Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

// ProtectedRoute component to handle authentication
function ProtectedRoute() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  
  return isAuthenticated ? <Layout /> : <Navigate to="/login" />;
}

export default App;