import React, { useEffect, useRef, useState } from 'react';
import emptyProfilePic from '../images/pngwing.com.png';

export default function Header({ listedItems }) {
  const genericHamburgerLine = `h-1 w-6 my-1 rounded-full bg-black transition ease transform duration-300`;
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
      <div className='text-3xl p-4 text-white grid grid-cols-2'>
        <p className='w-fit font-extrabold'>TopFind</p>
        <div className='flex justify-end'>
          <img src={emptyProfilePic} alt='EmptyPP' className='size-10 mr-3' />
          <MenuButton
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            genericHamburgerLine={genericHamburgerLine}
          />
        </div>
        <div className='flex mt-2'>
          <p className='text-2xl'>Search</p>
          <input
            type='text'
            value={searchBarValue}
            className='ml-2 text-black rounded-lg'
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
