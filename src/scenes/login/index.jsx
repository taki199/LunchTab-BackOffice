import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebook, FaGoogle, FaTwitter } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../features/userSlice';
import Message from '../../components/ErrorMessage';
import coverImage from '../../assets/cover.jpg'; // Adjust the import path as needed
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
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
    <div className='flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100'>
      <div className='flex flex-col items-center justify-center w-full flex-1 px-20 text-center'>
        <div className='bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl'>
          <div className='w-3/5 p-5'>
            <div className='text-left font-bold'>
              <Link to="/">
                <img src={coverImage} alt='Logo' width={100} height={80} className="px-2" />
              </Link>
            </div>
            <div className='py-10'>
              <h2 className='text-3xl font-bold text-green-500 mb-2'>Sign in to Account</h2>
              <div className='border-2 w-10 border-green-500 inline-block mb-2'></div>
              <div className='flex justify-center my-2'>
                <a href='#' className='border-2 border-gray-200 rounded-full p-3 mx-1 '>
                  <FaFacebook className='text-blue-700 text-2xl' />
                </a>
                <a href='#' className='border-2 border-gray-200 rounded-full p-3 mx-1'>
                  <FaGoogle className='text-red-700 text-2xl' />
                </a>
                <a href='#' className='border-2 border-gray-200 rounded-full p-3 mx-1'>
                  <FaTwitter className='text-blue-400 text-2xl' />
                </a>
              </div>
              <p className='text-gray-400 my-3 mb-4'> Or Use Your Email and password</p>
              <Message type={message ? (message.startsWith('Login successful') ? 'success' : 'error') : ''} message={message} />
              <form onSubmit={handleSubmit} className='flex flex-col items-center'>
                <div className='bg-gray-100 w-64 p-2 flex items-center mb-3'>
                  <EmailIcon fontSize="small" className='text-gray-500 m-2 text-sm' />
                  <input
                    type='email'
                    name='email'
                    placeholder='Email'
                    className='bg-gray-100 outline-none text-sm flex-1 text-black'
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                    value={credentials.email}
                  />
                </div>
                <div className='bg-gray-100 w-64 p-2 flex items-center'>
                  <LockIcon className='text-gray-500 m-2' />
                  <input
                    type='password'
                    name='password'
                    placeholder='Password'
                    className='bg-gray-100 outline-none text-sm flex-1 text-black'
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    value={credentials.password}
                  />
                </div>
                <div className='flex w-64 mb-5 justify-between mt-2'>
                  <label className='flex item-center text-xs text-black'>
                    <input type='checkbox' name='remember me' className='mr-1' /> Remember me
                  </label>
                  <a href="#" className='text-xs hover:text-green-400 text-black'>Forgot Password?</a>
                </div>
                <button type="submit" className='border-2 border-green-500 text-black rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-500 hover:text-white'>
                  Sign In
                </button>
              </form>
            </div>
          </div>
          <div className='w-2/5 bg-green-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12'>
            <h2 className='text-3xl font-bold mb-2'>Welcome Customer</h2>
            <div className='border-2 w-10 border-white inline-block mb-2'></div>
            <p className='mb-10'>Fill up personal information and start journey</p>
            <Link to="/register" className='border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-green-500'>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
