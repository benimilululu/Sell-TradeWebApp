import React, { useState } from 'react';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import Header from '../components/Header';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // console.log(auth?.currentUser?.email)

  const signIn = async () => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        setEmail('')
        setPassword('')
    } catch(err) {
        console.error(err)
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-screen'>
      <Header />
      <div className='text-center text-2xl text-white mt-10'>
          {auth?.currentUser?.email
            ? auth?.currentUser?.email
            : 'No Logged In Users'}
        <div className='grid justify-items-center text-2xl border rounded-lg mx-10 p-4 mt-10 text-white drop-shadow-2xl'>
          <p className='mt-4'>Login</p>
          <input
            type='text'
            placeholder='Email...'
            className='my-2 rounded-lg'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type='password'
            placeholder='Password...'
            className='my-2 rounded-lg'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {auth?.currentUser?.email ? (
            <button
              className='border p-2 rounded-2xl py-2 my-2'
              onClick={logOut}
            ></button>
          ) : (
            <button
              className='border p-2 rounded-2xl py-2 my-2'
              onClick={signIn}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
