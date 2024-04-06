'use client';
import React, { useEffect, useRef, useState, useContext } from 'react';
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

import { Fade } from 'react-reveal';

import { NightModeContext } from '../context/NightModeContext';

export default function Header({ listedItems, scrollHandler, currentUser }) {
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
   }, [nightMode])

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
    <div
    // className={`${
    //   !nightMode && 'bg-gradient-to-b from-cyan-700 via-cyan-900 to-gray-900'
    // }`}
    >
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
        {/* <!-- toggle structure
label
    input
    svg

the idea is to
1. hide the input on top of the svg
1. change the position/opacity of the svg as the input is toggled
--> */}
        <div className='flex justify-end'>
          <Fade top duration={1500}>
            <label for='toggle ' className=' mt-1'>
              <input type='checkbox' onClick={() => setNightMode(!nightMode)} />
              {/* </label> */}

              <svg
                viewBox='0 0 100 45'
                width='90'
                height='28'
                // className={`${
                //   nightMode ? 'bg-#151d29' : 'bg-#d6e7f7'
                // }`}
                // onClick={() => console.log('hi')}
              >
                <defs>
                  {/* <!-- rectangle used for the background and re-used in the clip and mask elements --> */}
                  <rect
                    id='background'
                    x='0'
                    y='0'
                    width='90'
                    height='40'
                    rx='20'
                  ></rect>

                  {/* <!-- clip cutting out the elements exceeding the rounded rectangle --> */}
                  <clipPath id='clip'>
                    <use href='#background'></use>
                  </clipPath>

                  {/* <!-- for the light variant --> */}
                  {/* <!-- gradient used for the background --> */}
                  <linearGradient
                    id='gradient-light'
                    x1='0'
                    x2='0'
                    y1='0'
                    y2='1'
                  >
                    <stop stop-color='#8bc8f2' offset='0'></stop>
                    <stop stop-color='#fff' offset='1'></stop>
                  </linearGradient>

                  {/* <!-- filter applied to (a copy of) the sun to blur the edges --> */}
                  <filter id='blur-light'>
                    <feGaussianBlur stdDeviation='1'></feGaussianBlur>
                  </filter>

                  {/* <!-- pattern for the waves --> */}
                  <pattern
                    id='pattern-light'
                    width='0.1'
                    height='1'
                    viewBox='0 0 10 45'
                  >
                    <path
                      fill='#40b5f8'
                      d='M 0 0 a 6 6 0 0 0 10 0 v 45 h -10 z'
                    ></path>
                  </pattern>

                  {/* <!-- for the dark variant --> */}
                  {/* <!-- gradient used for the background --> */}
                  <linearGradient
                    id='gradient-dark'
                    x1='0'
                    x2='0'
                    y1='0'
                    y2='1'
                  >
                    <stop stop-color='#1F2241' offset='0'></stop>
                    <stop stop-color='#7D59DF' offset='1'></stop>
                  </linearGradient>

                  {/* <!-- gradient used for the the mask */}
                  {/* the idea is to have the mask use the [#000-#fff] gradient to progressively hide the shapes as they approach the bottom */}
                  {/* --> */}
                  <linearGradient
                    id='gradient-mask'
                    x1='0'
                    x2='0'
                    y1='0'
                    y2='1'
                  >
                    <stop stop-color='#000' offset='0'></stop>
                    <stop stop-color='#fff' offset='1'></stop>
                  </linearGradient>

                  {/* <!-- mask to conceal the stars at the bottom of the toggle --> */}
                  <mask id='mask-dark'>
                    <use fill='url(#gradient-mask)' href='#background'></use>
                  </mask>

                  {/* <!-- gradients for the moon and craters --> */}
                  <radialGradient id='gradient-moon'>
                    <stop stop-color='#fdfdfd' offset='0.7'></stop>
                    <stop stop-color='#e2e2e2' offset='1'></stop>
                  </radialGradient>

                  <radialGradient id='gradient-crater'>
                    <stop stop-color='#e0e0e0' offset='0'></stop>
                    <stop stop-color='#d9d9d9' offset='1'></stop>
                  </radialGradient>

                  {/* <!-- pattern for the stars --> */}
                  <pattern
                    id='pattern-dark'
                    width='0.2'
                    height='1'
                    viewBox='0 0 20 45'
                  >
                    <path
                      fill='#fff'
                      d='M 2 5 l 1 1 l -1 1 l -1 -1 l 1 -1'
                    ></path>
                    <path
                      fill='#fff'
                      d='M 10 16 l 1 1 l -1 1 l -1 -1 l 1 -1'
                    ></path>
                    <path
                      fill='#fff'
                      d='M 16 27 l 1 1 l -1 1 l -1 -1 l 1 -1'
                    ></path>
                    <path
                      fill='#fff'
                      d='M 10 38 l 1 1 l -1 1 l -1 -1 l 1 -1'
                    ></path>
                  </pattern>
                </defs>

                {/* <!-- actual graphics
        the idea is to include the elements for the light variant on top of the dark counterpart and change the opacity when the input is toggled
        ! beside changing the opacity of the .light elements the transition also affects the position of the sun/moon and of the patterns
    --> */}
                <g transform='translate(5 2.5)'>
                  <g clip-path='url(#clip)'>
                    <g class='dark'>
                      <use fill='url(#gradient-dark)' href='#background'></use>
                      {/* translate the stars above the toggle
                ! the change in y scale allows to transition the stars with a faster pace (see the CSS) */}

                      <g
                        class='background'
                        transform='translate(0 -40) scale(1 0.4)'
                      >
                        <rect
                          transform='translate(-40 0) rotate(4)'
                          fill='url(#pattern-dark)'
                          x='0'
                          y='0'
                          width='100'
                          height='45'
                        ></rect>
                      </g>
                      <use
                        mask='url(#mask-dark)'
                        fill='url(#gradient-dark)'
                        href='#background'
                      ></use>
                    </g>
                    <g class='light'>
                      <use fill='url(#gradient-light)' href='#background'></use>
                      {/* <!-- translate the waves above the toggle and reset their position with an opposite translation
                by translating the first group to 0 (alongside the stars) the waves are pushed below
                --> */}
                      <g class='background' transform='translate(-30 -20)'>
                        <g transform='translate(30 20)'>
                          <rect
                            fill='url(#pattern-light)'
                            x='-5'
                            y='27.5'
                            width='100'
                            height='45'
                          ></rect>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>

                <g transform='translate(77.5 22.5)'>
                  {/* <!-- translate this group to move the sun/moon to the right --> */}
                  <g class='translate' transform='translate(-55)'>
                    {/* <!-- rotate this group to rotate the moon --> */}
                    <g class='rotate' transform='rotate(-100)'>
                      <g class='dark'>
                        <circle
                          fill='url(#gradient-moon)'
                          cx='0'
                          cy='0'
                          r='20.5'
                        ></circle>
                        <g transform='translate(-8 -7.5)'>
                          <ellipse
                            transform='rotate(-30)'
                            fill='url(#gradient-crater)'
                            stroke='#d5d5d5'
                            stroke-width='0.2'
                            cx='0'
                            cy='0'
                            rx='4'
                            ry='3'
                          ></ellipse>
                        </g>
                        <g transform='translate(11 5)'>
                          <ellipse
                            fill='url(#gradient-crater)'
                            stroke='#d5d5d5'
                            stroke-width='0.2'
                            cx='0'
                            cy='0'
                            rx='3.85'
                            ry='4'
                          ></ellipse>
                        </g>
                        <g transform='translate(-6 12)'>
                          <ellipse
                            transform='rotate(-10)'
                            fill='url(#gradient-crater)'
                            stroke='#d5d5d5'
                            stroke-width='0.2'
                            cx='0'
                            cy='0'
                            rx='2'
                            ry='1.75'
                          ></ellipse>
                        </g>
                      </g>
                    </g>
                    <g class='light'>
                      <circle
                        fill='#FFD21F'
                        cx='0'
                        cy='0'
                        r='21'
                        filter='url(#blur-light)'
                      ></circle>
                      <circle fill='#FFD21F' cx='0' cy='0' r='20.5'></circle>
                    </g>
                  </g>
                </g>
              </svg>
            </label>

            {/* <div className='flex justify-end'> */}
            {/* <Fade top duration={1500}> */}
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

const HamburgerMenu = ({ e, isOpen, isOpenDiv, ref, setIsOpen }) => {
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
      className={`fixed animate-slide-down  mt-12 grid text-center w-11/12 border rounded-xl  drop-shadow-2xl backdrop-blur-3xl bg-gradient-to-b from-cyan-700 via-cyan-900 to-gray-900`}
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
};
