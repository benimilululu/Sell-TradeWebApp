import React, { useState } from 'react';
import { auth } from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

import toast, { Toaster } from 'react-hot-toast';

export default function Login() {
  const [loginPage, setLoginPage] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // console.log(auth?.currentUser?.email)
  const nav = useNavigate();

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
      toast.success('Successfully created account!');
      setTimeout(() => {
        nav('/');
      }, 1200);
    } catch (err) {
      toast.error('Cannot create acc...');
      console.error(err);
    }
  };

  const logIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Successfully Logged In!');
      setEmail('');
      setPassword('');
      setTimeout(() => {
        nav('/');
      }, 1200);
    } catch (err) {
      toast.error('Something is wrong with you email or password.');
      console.error(err);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      toast.success('Successfully Logged Out!');
      setTimeout(() => {
        nav('/');
      }, 1200);
    } catch (err) {
      console.error(err);
    }
  };

  const showRegisterPage = () => {
    return (
      <div className='text-center text-2xl text-white mt-20'>
        <div className='text-2xl border-4 rounded-lg mx-10 p-4 mt-10 text-white drop-shadow-2xl'>
          <p className='my-4'>Register</p>
          <input
            type='text'
            placeholder='Email...'
            className='my-2 rounded-lg text-black text-xl p-1'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type='password'
            placeholder='Password...'
            className='my-2 rounded-lg text-black text-xl p-1'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {auth?.currentUser?.email ? (
            <button
              className='border p-2 rounded-2xl py-2 my-2'
              onClick={logOut}
            >
              LogOut
            </button>
          ) : (
            <button
              className='border p-2 rounded-2xl py-2 my-2'
              onClick={register}
            >
              Register
            </button>
          )}
        </div>
      </div>
    );
  };

  const showLogInPage = () => {
    return (
      <div className=' text-center text-2xl text-white mt-20'>
        <div className='grid justify-items-center text-2xl border-4 rounded-lg mx-10 p-4 mt-10 text-white drop-shadow-2xl'>
          <p className='my-4'>Login</p>
          <input
            type='text'
            placeholder='Email...'
            className='my-2 rounded-lg text-xl text-black p-1'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type='password'
            placeholder='Password...'
            className='my-2 rounded-lg text-xl text-black p-1'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {auth?.currentUser?.email ? (
            <button
              className='border p-2 rounded-2xl py-2 my-2'
              onClick={logOut}
            >
              LogOut
            </button>
          ) : (
            <button
              className='border p-2 rounded-2xl py-2 my-2'
              onClick={logIn}
            >
              Login
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className='relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-screen'>
      <Toaster />
      <Header />
      <div className='w-full  grid grid-cols-2 text-center  gap-2 text-xl items-center'>
        <p
          className={`p-1 duration-150 mx-3 ${
            loginPage ? 'border-4 rounded-full' : ''
          }`}
          onClick={() => setLoginPage(true)}
        >
          Login
        </p>
        <p
          className={`p-1 duration-150 mx-3 ${
            !loginPage ? 'border-4 rounded-full' : ''
          }`}
          onClick={() => setLoginPage(false)}
        >
          Register
        </p>
      </div>
      {loginPage && showLogInPage()}
      {!loginPage && showRegisterPage()}
    </div>
  );
}
