'use client';
import React, { useEffect, useRef, useState, useContext } from 'react';
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

import { Fade } from 'react-reveal';

import { NightModeContext } from '../context/NightModeContext';
import Night_LightModeButton from './Night-lightModeButton';

import { useLocation } from 'react-router-dom';
import Categories from './Categories';

export default function Header({
  listedItems,
  scrollHandler,
  currentUser,
  scrollToCategories,
  scrollToAboutUs,
}) {
  // const [nightMode, setNightMode] = useState(true)
  const [isOpen, setIsOpen] = useState(false);

  const [searchBarValue, setSearchBarValue] = useState('');
  const [searchResultIsOpen, setSearchResultsIsOpen] = useState(false);

  const searchResultsRef = useRef(null);

  const isHomePage = location.pathname === '/';

  const genericHamburgerLine = `h-1 w-6 my-1 rounded-full bg-white transition ease transform duration-300`;

  const { nightMode } = useContext(NightModeContext);
  const { setNightMode } = useContext(NightModeContext);

  useEffect(() => {
    if (nightMode) {
      document.body.style.backgroundImage =
        'linear-gradient(to bottom, #119191,#053535)';
    } else {
      document.body.style.backgroundImage =
        'linear-gradient(to bottom, #111827, #064242)';
    }

    return () => {
      document.body.style.background = ''; // Reset to default background
    };
  }, [nightMode]);

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
    <div>
      <Toaster />
      <div className='text-3xl p-4 text-white grid grid-cols-2'>
        <Fade top duration={1500}>
          <p className='w-fit font-extrabold'>
            <Link
              to='/'
              onClick={() => {
                if (isHomePage) {
                  toast.success('This is Home Page... ENJOY!');
                }
              }}
              className=''
            >
              TopFind
            </Link>
          </p>
        </Fade>

        <div className='flex justify-end'>
          <Fade top duration={1500}>
            <Night_LightModeButton
              nightMode={nightMode}
              setNightMode={setNightMode}
            />
            <MenuButton
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              genericHamburgerLine={genericHamburgerLine}
              scrollHandler={scrollHandler}
              isHomePage={isHomePage}
            />
          </Fade>

          {isOpen && (
            <HamburgerMenu
              e={auth?.currentUser?.email}
              isOpen={setIsOpen}
              isOpenDiv={isOpen}
              scrollToCategories={scrollToCategories}
              scrollHandler={scrollHandler}
              scrollToAboutUs={scrollToAboutUs}
            />
          )}
        </div>
        {isHomePage && (
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
        )}

        <div></div>
        {searchResultIsOpen && (
          <div
            className='fixed inset-y-28 left-28 border-2 w-4/6 h-96 rounded-3xl backdrop-blur-xl overflow-scroll bg-gradient-to-b from-cyan-700 via-cyan-900 to-gray-900'
            ref={searchResultsRef}
          >
            <FilteringItems
              items={listedItems}
              searchBarValue={searchBarValue}
            />
          </div>
        )}
        {isHomePage && currentUser && (
          <Fade bottom duration={1500}>
            <div
              className={`fixed bottom-2 right-2 size-5 border-4 h-28 w-28 object-cover backdrop-blur-xl rounded-full`}
            >
              <Link to='/chat'>
                <FaRocketchat className=' h-16 w-16 m-auto mt-3 drop-shadow-2xl' />
                <p className='m-auto text-center text-xl font-bold'>Chat</p>
              </Link>
            </div>
          </Fade>
        )}
      </div>
    </div>
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

const MenuButton = ({
  isOpen,
  setIsOpen,
  genericHamburgerLine,
  scrollHandler,
  isHomePage,
}) => {
  return (
    <button
      className='flex flex-col h-10 w-10 border-2  rounded justify-center items-center group'
      onClick={() => {
        setIsOpen(!isOpen);
        if (isHomePage) {
          return scrollHandler();
        }
      }}
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

const HamburgerMenu = ({
  e,
  isOpen,
  isOpenDiv,
  scrollToCategories,
  scrollHandler,
  scrollToAboutUs,
}) => {
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

  const handleButtonClick = (e) => {
    if (location.pathname === '/') {
      if (e === 'categories') {
        isOpen(false);
        scrollHandler();
        scrollToCategories();
      } else if (e === 'about') {
        isOpen(false);
        scrollHandler();
        scrollToAboutUs();
      }
    } else {
      nav('/', { state: { action: 'someAction' } });
    }
  };

  return (
    <div
      className={`fixed animate-slide-down  mt-12 grid text-center w-11/12 border rounded-xl  drop-shadow-2xl backdrop-blur-3xl `}
    >
      {e ? (
        <Link className=' border rounded-lg m-4 p-2' to='/profile'>
          My Profile
        </Link>
      ) : (
        <Link className='border rounded-lg m-4 p-2' to='/login'>
          Login
        </Link>
      )}
      <Link
        className='border rounded-lg m-4 p-2'
        to={'/list-item'}
      >
        List Item
      </Link>
      <Link className='border rounded-lg m-4 p-2' to='/how-it-works'>
        How it Works ?
      </Link>
      <Link
        className='border rounded-lg m-4 p-2'
        to={'/'}
        state={{ action: 'categories' }}
        onClick={() => handleButtonClick('categories')}
      >
        <p>Categories</p>
      </Link>
      <Link
        className='border rounded-lg m-4 p-2'
        to={'/'}
        state={{ action: 'about' }}
        onClick={() => handleButtonClick('about')}
      >
        <p> About Us</p>
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
};
