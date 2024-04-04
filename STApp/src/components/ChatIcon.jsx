import React from 'react'
import { FaRocketchat } from 'react-icons/fa';
import { Link } from 'react-router-dom';


export default function ChatIcon() {
  return (
    <div
      className={`absolute bottom-2 right-2 size-5 border-2 h-28 w-28 object-cover backdrop-blur-xl rounded-full`}
    >
      <Link to='/chat'>
        <FaRocketchat className=' h-16 w-16 m-auto mt-3 drop-shadow-2xl' />
        <p className='m-auto text-center text-xl'>Chat</p>
      </Link>
    </div>
  );
}
