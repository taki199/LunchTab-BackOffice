import React, { useEffect, useMemo } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { themeSettings } from "./theme";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate, useParams } from "react-router-dom";
import Layout from "./scenes/layout";
import Dashboard from "./scenes/dashboard";
import Login from "./scenes/login";
import Admin from './scenes/admin';
import { fetchUser, setAuthenticated } from "./features/userSlice";
import Orders from "./scenes/orders";
import Customer from "./scenes/customer";
import Dish from './scenes/Dish';
import Category from './scenes/category';
import Profile from './scenes/Profile';
import { Toast } from './components/Toast';
import AddDishForm from './scenes/addDish'
import UpdateDishForm from './scenes/updateDish';
import Ai from './scenes/ai'
import UpdateCategoryForm from './scenes/updateCategory';
import Monthly from './scenes/monthly';
import Daily from './scenes/daily'
import Overview from './scenes/overview'
// Create a new theme for the login page
const loginTheme = createTheme({
  palette: {
    primary: {
      main: '#333',
    },
    secondary: {
      main: '#666',
    },
  },
});

// Wrap the login page with the new theme
const LoginWrapper = () => {
  return (
    <ThemeProvider theme={loginTheme}>
      <Login />
    </ThemeProvider>
  );
};

export default function App() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("App component mounted");
    console.log("useEffect triggered");

    const userData = localStorage.getItem('userData');
    console.log("userData from local storage:", userData);

    if (userData) {
      // Parse user data from local storage
      const parsedUserData = JSON.parse(userData);
      console.log("Parsed user data:", parsedUserData);

      // Dispatch action to set isAuthenticated to true and populate user data
      dispatch(setAuthenticated(true));
      dispatch(fetchUser(parsedUserData));
    } else {
      // No user data found, set isAuthenticated to false
      console.log("No user data found in local storage");
      dispatch(setAuthenticated(false));
    }
  }, [dispatch]);

  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route element={<LoginWrapper />} path="/login" />
            <Route element={<ProtectedRoute />} path="/">
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/customers" element={<Customer />} />
              <Route path="/monthly" element={<Monthly />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/daily" element={<Daily />} />
              <Route path="/products" element={<Dish />} />
              <Route path="/products/addDish" element={<AddDishForm />} />
              <Route path="/products/updateDish/:dishId" element={<UpdateDishFormWrapper />} />
              <Route path="/category" element={<Category />} />
              <Route path="/category/UpdateCategory/:categoryId" element={<UpdateCategoryForm />} />
              <Route path="/ai" element={<Ai />} />
              <Route path='/profile/me' element={<Profile />} />
            </Route>
          </Routes>
          <Toast/>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

const UpdateDishFormWrapper = () => {
  const { dishId } = useParams();
  return <UpdateDishForm dishId={dishId} />;
};

const UpdateCategoryFormWrapper = () => {
  const { categoryId } = useParams();
  return <UpdateCategoryForm categoryId={categoryId} />;
};

// Define ProtectedRoute component
function ProtectedRoute() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  console.log("isAuthenticated:", isAuthenticated);

  return isAuthenticated ? <Layout/> : <Navigate to="/login" />;
}
