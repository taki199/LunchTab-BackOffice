import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../../features/userSlice';
import { useNavigate } from 'react-router-dom';
import coverImage from '../../assets/cover.jpg';
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


// import React, { useState } from "react";
// import { useGoogleLogin } from "@react-oauth/google";
// import { useDispatch } from "react-redux";
// import { fetchUser } from "../../features/userSlice";
// import { useNavigate } from "react-router-dom";
// import { FcGoogle } from "react-icons/fc";
// import { Link } from "react-router-dom";
// import { Button, Logo, Inputbox,Divider} from "../../components";
// import { Toaster, toast } from "sonner";

// const LoginPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [data, setData] = useState({ email: "", password: "" });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData({
//       ...data,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const user = await dispatch(fetchUser(data));
//       if (user) {
//         navigate("/dashboard");
//       } else {
//         console.log("Invalid credentials");
//       }
//     } catch (error) {
//       console.log("Login failed. Please try again.");
//     }
//   };

//   return (
//     <div className="flex w-full h-[100vh]">
//       <div className="hidden md:flex flex-col gap-y-4 w-1/3 min-h-screen bg-black items-center justify-center">
//         <Logo type="signin" />
//         <span className="text-xl font-semibold text-white">Welcome, back!</span>
//       </div>

//       <div className="flex w-full md:w-2/3 h-full bg-white dark:bg-gradient-to-b md:dark:bg-gradient-to-r from-black via-[#071b3e] to-black items-center px-10 md:px-20 lg:px-40">
//         <div className="h-full flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//           <div className="block mb-10 md:hidden">
//             <Logo />
//           </div>
//           <div className="max-w-md w-full space-y-8">
//             <div>
//               <h2 className="mt-6 text-center text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
//                 Sign in to your account
//               </h2>
//             </div>

//             <Button
              
//               label="Sign in with Google"
//               icon={<FcGoogle className="" />}
//               styles="w-full flex flex-row-reverse gap-4 bg-white dark:bg-transparent text-black dark:text-white px-5 py-2.5 rounded-full border border-gray-300"
//             />

//             <Divider label="or sign in with email" />

//             <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//               <div className="flex flex-col rounded-md shadow-sm -space-y-px gap-5">
//                 <Inputbox
//                   label="Email Address"
//                   name="email"
//                   type="email"
//                   isRequired={true}
//                   placeholder="email@example.com"
//                   value={data?.email}
//                   onChange={handleChange}
//                 />

//                 <Inputbox
//                   label="Password"
//                   name="password"
//                   type="password"
//                   isRequired={true}
//                   placeholder="Password"
//                   value={data?.password}
//                   onChange={handleChange}
//                 />
//               </div>

//               <Button
//                 label=" Sign In"
//                 type="submit"
//                 styles="group relative w-full flex justify-center py-2.5 2xl:py-3 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-black dark:bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 mt-8"
//               />
//             </form>

//             <div className="flex items-center justify-center text-gray-600 dark:text-gray-300">
//               <p>
//                 Dont't have an account?{" "}
//                 <Link to="/sign-up" className="text-blue-800 font-medium">
//                   Sign up
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Toaster richColors />
//     </div>
//   );
// };

// export default LoginPage;
