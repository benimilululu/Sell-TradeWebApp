import React, { useState } from 'react';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
// import { db } from '../config/firebase';
// import { getDocs, collection } from 'firebase/firestore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  console.log(auth?.currentUser?.email)

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
    <div className='grid justify-items-center text-2xl border rounded-lg m-10 p-4'>
      {auth?.currentUser?.email
        ? auth?.currentUser?.email
        : 'No Logged In Users'}
      <p className='mt-4'>Login</p>
      <input
        type='text'
        placeholder='Email...'
        className='my-2'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type='password'
        placeholder='Password...'
        className='my-2'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button className='border p-2 rounded-2xl py-2 my-2' onClick={signIn}>
        Login
      </button>
      <button className='border p-2 rounded-2xl py-2 my-2' onClick={logOut}>
        LogOut
      </button>
    </div>
  );
}
