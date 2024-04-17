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

  const hamburgerMenuRef = useRef(null);

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
    function handleClickOutside(e) {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(e.target)
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
    <div className=''>
      <Toaster />
      <div className='text-3xl p-4 md:ml-3 text-white grid grid-cols-2 md:text-4xl'>
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

        <div className='relative justify-end'>
          <Fade top duration={1500}>
            <div className='m-1  rounded-full'>
              <Night_LightModeButton
                nightMode={nightMode}
                setNightMode={setNightMode}
              />
            </div>
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
              hamburgerMenuRef={hamburgerMenuRef}
              isHomePage={isHomePage}
            />
          )}
        </div>
        {isHomePage && (
          <div className='col-span-2 md:col-span-1 flex mt-4'>
            <p className='text-2xl'>Search</p>
            <input
              type='text'
              value={searchBarValue}
              className=' ml-4 text-black rounded-lg w-full md:w-4/6'
              onChange={(e) => {
                storingInputValue(e);
              }}
            />
          </div>
        )}

        <div></div>
        {searchResultIsOpen && (
          <div
            className='absolute mt-2 inset-y-28 left-28 border-2 w-4/6 h-96 rounded-3xl backdrop-blur-xl overflow-auto md:w-2/6 md:h-4/6 overflow-x-hidden'
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
              className={`fixed bottom-2 right-2 size-5 border-4 h-28 w-28 object-cover backdrop-blur-xl rounded-full md:z-20`}
            >
              <Link to='/chat'>
                <FaRocketchat className='h-16 w-16 m-auto mt-3 drop-shadow-2xl' />
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
  const filteredItems = items?.filter((item) =>
    item.Name.toLowerCase().includes(searchBarValue.toLowerCase())
  );
  console.log(filteredItems);

  if (filteredItems.length) {
    return filteredItems.map((item) => (
      <Link key={item.id} to={`/listed-item/${item.id}`}>
        <div
          key={item.id}
          className='border-2 p-4 rounded-2xl m-4 text-center '
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
  } else {
    return (
      <div className='flex justify-center items-center h-full'>
        <p className='font-bold'>No Items Found ...</p>
      </div>
    );
  }
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
  isHomePage
}) => {
  const nav = useNavigate();
  const hamburgerMenuRef = useRef(null)

  useEffect(() => {
    function handleClickOutside2(e) {
      if (
        hamburgerMenuRef.current &&
        !hamburgerMenuRef.current.contains(e.target)
      ) {
        isOpen(!isOpenDiv);
      }
    }
    document.addEventListener('mousedown', handleClickOutside2);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside2);
    };
  }, []);

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
      className={`absolute md:duration-300 animate-slide-down  mt-12 grid text-center w-11/12 md:w-3/12  mx-auto border-4 rounded-xl  drop-shadow-2xl backdrop-blur-3xl md:text-2xl z-20`}
      // ref={hamburgerMenuRef}
    >
      {!isHomePage && (
        <Link
          className=' border rounded-lg m-4 p-2 md:duration-300 md:hover:bg-teal-600'
          to='/'
        >
          Home Page
        </Link>
      )}
      {e ? (
        <>
         <Link
          className=' border rounded-lg m-4 p-2 md:duration-300 md:hover:bg-teal-600'
          to='/profile'
        >
          My Profile
        </Link>
        <Link
          className=' border rounded-lg m-4 p-2 md:duration-300 md:hover:bg-teal-600'
          to='/chat'
        >
          Chat
        </Link>
        </>
       
      ) : (
        <Link
          className='border rounded-lg m-4 p-2 md:duration-300 md:hover:bg-teal-600'
          to='/login'
        >
          Login
        </Link>
      )}
      <Link
        className='border rounded-lg m-4 p-2 md:hover:bg-teal-600 md:duration-300'
        to={'/list-item'}
      >
        List Item
      </Link>
      <Link
        className='border rounded-lg m-4 p-2 md:hover:bg-teal-600 md:duration-300'
        to='/how-it-works'
      >
        How it Works ?
      </Link>
      <Link
        className='border rounded-lg m-4 p-2 md:hover:bg-teal-600 md:duration-300'
        to={'/'}
        state={{ action: 'categories' }}
        onClick={() => handleButtonClick('categories')}
      >
        <p>Categories</p>
      </Link>
      <Link
        className='border rounded-lg m-4 p-2 md:hover:bg-teal-600 md:duration-300'
        to={'/'}
        state={{ action: 'about' }}
        onClick={() => handleButtonClick('about')}
      >
        <p> About Us</p>
      </Link>
      {e && (
        <button
          className='border rounded-lg m-4 p-2  md:hover:bg-teal-600 md:duration-300'
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
