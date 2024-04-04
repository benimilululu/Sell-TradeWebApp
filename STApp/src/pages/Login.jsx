import React, { useContext, useState } from 'react';
import { auth, db } from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import Header from '../components/Header';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import toast, { Toaster } from 'react-hot-toast';
import { setDoc, doc } from 'firebase/firestore';

export default function Login() {
  const [loginPage, setLoginPage] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { currentUser } = useContext(AuthContext);

  const nav = useNavigate();

  // console.log(auth?.currentUser?.email)

  const register = async () => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
      // setTimeout(() => {
      // }, 1200);
      await setDoc(doc(db, 'users', res.user.uid), {
        email,
        uid: res.user.uid,
      });
      await setDoc(doc(db, 'chatUsers', res.user.uid), {});
      nav('/');
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
        <div className='text-2xl border-4 rounded-lg mx-10 p-4 mt-10 text-white '>
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

          <button
            className='border px-4 rounded-2xl text-black font-bold  my-6 bg-sky-200'
            onClick={register}
          >
            Register
          </button>
        </div>
      </div>
    );
  };

  const showLogInPage = () => {
    return (
      <div className=' text-center text-2xl text-white mt-20'>
        <div className='justify-items-center text-2xl border-4 rounded-lg mx-10 p-4 mt-10 text-white '>
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
              className='border px-4 rounded-2xl text-black font-bold  my-6 bg-sky-200'
              onClick={logIn}
            >
              Login
            </button>
          )}
        </div>
      </div>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (currentUser) {
      toast.error('Cannot create acc...');
      return <Navigate to='/' />;
    }

    return children;
  };

  return (
    // <ProtectedRoute>
    <div className=' h-screen'>
      <Toaster />
      <Header />
      <div className='w-full mt-10  grid grid-cols-2 text-center  gap-2 text-xl items-center font-bold'>
        <p
          className={`p-1 duration-300 mx-3 ${
            loginPage ? 'bg-sky-200 rounded-full' : ''
          }`}
          onClick={() => setLoginPage(true)}
        >
          Login
        </p>
        <p
          className={`p-1 duration-300 mx-3 ${
            !loginPage ? 'bg-sky-200 rounded-full' : ''
          }`}
          onClick={() => setLoginPage(false)}
        >
          Register
        </p>
      </div>
      {loginPage && showLogInPage()}
      {!loginPage && showRegisterPage()}
    </div>
    // </ProtectedRoute>
  );
}
