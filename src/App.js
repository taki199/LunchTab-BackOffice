import React, { useEffect, useMemo } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { themeSettings } from "./theme";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./scenes/layout";
import Dashboard from "./scenes/dashboard";
import Login from "./scenes/login";
import { fetchUser } from "./features/userSlice";
import Admin from './scenes/admin';

function App() {
  const mode = useSelector((state) => state.global.mode);
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

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={isAuthenticated ? <Layout><Admin /></Layout> : <Navigate to="/login" />} />
            <Route path="/dashboard" element={isAuthenticated ? <Layout><Dashboard /></Layout> : <Navigate to="/login" />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
