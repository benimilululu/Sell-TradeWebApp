import React from 'react'
import { Link } from 'react-router-dom'

export default function ErrorElement() {
  return (
    <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-center h-screen'>
      <p className='pt-28 text-white text-4xl'>404 Not Found !</p>

      <button className='mt-8 border rounded-xl mb-5 p-2 text-white w-fit'>
        <Link to='/'>Got to the Home Page </Link>
      </button>
    </div>
  );
}
