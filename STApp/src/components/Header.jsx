'use client';
import React, { useEffect, useRef, useState } from 'react';
import emptyProfilePic from '../images/pngwing.com.png';
import { Link } from 'react-router-dom';
import { auth } from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { FaRocketchat } from 'react-icons/fa';


export default function Header({ listedItems }) {
  const genericHamburgerLine = `h-1 w-6 my-1 rounded-full bg-white transition ease transform duration-300`;
  const [isOpen, setIsOpen] = useState(false);

  const [searchBarValue, setSearchBarValue] = useState('');
  const [searchResultIsOpen, setSearchResultsIsOpen] = useState(false);

  const searchResultsRef = useRef(null);

  useEffect(() => {
    // !Hiding Search Result div if we click outside that div ->
    function handleClickOutside() {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target)
      ) {
        setSearchBarValue('');
        setSearchResultsIsOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const storingInputValue = (e) => {
    setSearchBarValue(e.target.value);

    // Showing the results if we have value in input ->
    if (e.target.value.length) {
      setSearchResultsIsOpen(true);
    } else {
      setSearchResultsIsOpen(false);
    }
  };



  return (
    <>
      <Toaster />
      <div className='text-3xl p-4 text-white grid grid-cols-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
        <p className='w-fit font-extrabold'>
          <Link to='/'>TopFind</Link>
        </p>
        <div className='flex justify-end'>
          {/* <Link to='/login'>
            <img src={emptyProfilePic} alt='EmptyPP' className='size-10 mr-3' />
          </Link> */}
          <MenuButton
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            genericHamburgerLine={genericHamburgerLine}
          />

          {isOpen && (
            <HamburgerMenu
              e={auth?.currentUser?.email}
              isOpen={setIsOpen}
              isOpenDiv={isOpen}
            />
          )}
        </div>
        <div className='flex mt-4'>
          <p className='text-2xl'>Search</p>
          <input
            type='text'
            value={searchBarValue}
            className='ml-4 text-black rounded-lg w-fit'
            onChange={(e) => {
              storingInputValue(e);
            }}
          />
        </div>
        <div></div>
        {searchResultIsOpen && (
          <div
            className='absolute inset-y-28 left-24 border-2 w-2/3 h-2/4 rounded-3xl backdrop-blur-xl overflow-scroll'
            ref={searchResultsRef}
          >
            <FilteringItems
              items={listedItems}
              searchBarValue={searchBarValue}
            />
          </div>
        )}
        <div className='fixed bottom-2 right-2 size-5 border-2 h-28 w-28 object-cover backdrop-blur-xl rounded-full'>
          <Link to='/chat'>
            <FaRocketchat className='h-16 w-16 m-auto mt-3 drop-shadow-2xl' />
          <p className='m-auto text-center text-xl'>Chat</p>
          </Link>
        </div>
      </div>
    </>
  );
}

//  Search bar result ->
// Filtering Listed Items ->
const FilteringItems = ({ items, searchBarValue }) => {
  return items
    ?.filter((item) =>
      item.Name.toLowerCase().includes(searchBarValue.toLowerCase())
    )
    .map((item) => (
      <Link key={item.id} to={`/listed-item/${item.Name}`}>
        <div
          key={item.id}
          className='border-2 p-4 rounded-2xl m-4 overflow-scroll text-center'
        >
          <img className='rounded-xl' src={item.ImageUrl} />
          <p>
            Name: {item.Company} {item.Name}
          </p>
          <p>Size : {item.Number}</p>
          <p>Price : {item.Price}$</p>
          <p>{item.UserID}</p>
        </div>
      </Link>
    ));
};

const MenuButton = ({ isOpen, setIsOpen, genericHamburgerLine }) => {
  return (
    <button
      className='flex flex-col h-10 w-10 border-2  rounded justify-center items-center group'
      onClick={() => setIsOpen(!isOpen)}
    >
      <div
        className={`${genericHamburgerLine} ${
          isOpen
            ? 'rotate-45 translate-y-3 opacity-50 group-hover:opacity-100'
            : 'opacity-50 group-hover:opacity-100'
        }`}
      />
      <div
        className={`${genericHamburgerLine} ${
          isOpen ? 'opacity-0' : 'opacity-50 group-hover:opacity-100'
        }`}
      />
      <div
        className={`${genericHamburgerLine} ${
          isOpen
            ? '-rotate-45 -translate-y-3 opacity-50 group-hover:opacity-100'
            : 'opacity-50 group-hover:opacity-100'
        }`}
      />
    </button>
  );
};


const HamburgerMenu = ({e, isOpen, isOpenDiv}) => {
  const nav = useNavigate();

   const logOut = async () => {
     try {
       await signOut(auth);
       toast.success('Successfully Logged Out!');
       nav('/');
     } catch (err) {
       console.error(err);
     }
   };

  return (
    <div
      className={`animate-slide-down absolute mt-12 grid text-center w-11/12 border rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 drop-shadow-2xl `}
    >
      {e ? (
        <Link className='border rounded-lg m-4 p-2' to='/profile'>
          My Profile
        </Link>
      ) : (
        <Link className='border rounded-lg m-4 p-2' to='/login'>
          Login
        </Link>
      )}
      <Link className='border rounded-lg m-4 p-2' to='/list-item'>
        List Item
      </Link>
      <Link className='border rounded-lg m-4 p-2' to='/how-it-works'>
        How it Works ?
      </Link>
      <Link className='border rounded-lg m-4 p-2' to='/login'>
        Categories
      </Link>
      <Link className='border rounded-lg m-4 p-2' to='/login'>
        About Us
      </Link>
      {e && (
        <button
          className='border rounded-lg m-4 p-2'
          onClick={() => {
            isOpen(false);
            logOut();
          }}
        >
          Log Out
        </button>
      )}
    </div>
  );
}