import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../../features/userSlice';
import { useNavigate } from 'react-router-dom';
import coverImage from '../../assets/‘Dublin’ Hand-painted photography background, textured olive green plaster with umber & brighter pear green highlights - 80x120cm.jpg';
import Message from '../../components/ErrorMessage';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await dispatch(fetchUser(credentials));
      if (user) {
        setMessage('Login successful!');
        navigate('/dashboard');
      } else {
        setMessage('Invalid credentials');
      }
    } catch (error) {
      setMessage('Login failed. Please try again.');
    }
  };

  return (
    <div className='w-full h-screen flex items-start bg-white'>
      <div className='relative w-1/2 h-full flex flex-col items-center'>
        <div className='absolute top-20  flex flex-col  text-white'>
          <h1 className='text-4xl font-extrabold my-4 text-[white]'> LaunchTab</h1>
        </div>
        <img src={coverImage} className='w-full h-full object-cover' alt='Cover' />
      </div>
      <div className='w-full h-full bg-white flex flex-col justify-center items-center p-14'>
        <h1 className='text-[#28AF61] text-lg font-semibold mb-4'>LaunchTab</h1>
        <div className='w-full max-w-md flex flex-col mb-4'>
          <h3 className='text-3xl font-semibold mb-2 text-black'>Login</h3>
          <Message type={message ? (message.startsWith('Login successful') ? 'success' : 'error') : ''} message={message} />
          <form onSubmit={handleSubmit}>
            <input
              type='email'
              placeholder="Email"
              className='w-full text-black py-2 px-4 my-2 bg-gray-200 border border-gray-300 rounded-md outline-none focus:ring focus:ring-gray-400'
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              value={credentials.email}
              name="email"
            />
            <input
              type='password'
              placeholder='Password'
              className='w-full text-black py-2 px-4 my-2 bg-gray-200 border border-gray-300 rounded-md outline-none focus:ring focus:ring-gray-400'
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              value={credentials.password}
              name="password"
            />
            <button type="submit" className="w-full max-w-md bg-[green] text-white py-3 px-6 rounded-md hover:bg-[#28AF61] transition duration-300">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
