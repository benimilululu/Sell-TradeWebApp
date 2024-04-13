import React, { useState, useEffect } from 'react';
import { auth, db, imgDB } from '../config/firebase';
import { getDocs, collection, addDoc } from 'firebase/firestore';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Header from '../components/Header';

import { Navigate, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import { useLocation } from 'react-router-dom';

// import { Dropdown } from 'primereact/dropdown';

export default function AddingItemTotList() {
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [price, setPrice] = useState('');
  const [isNew, setIsNew] = useState('');
  const [img, setImg] = useState('');
  const [category, setCategory] = useState('');
  const [dropdown, setDropdown] = useState(false);

  const nav = useNavigate();

  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      const action = location.state.action;
      console.log('Received action:', action);
    } else {
      console.log('No state received');
    }
  }, [location]);

  const inputClassNames = 'my-2 w-full rounded-md pl-2';

  const listedItemsCollectionRef = collection(db, 'ListedItems');

  // !Adding data to Cloud Firestore ->
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    if (img && category) {
      try {
        await addDoc(listedItemsCollectionRef, {
          Company: company,
          Condition: isNew,
          Description: description,
          Name: name,
          Number: number,
          Price: price,
          UserID: auth?.currentUser?.email,
          ImageUrl: img,
          Cat: category,
          uid: auth?.currentUser?.uid,
        });
        toast.success('Successfully Added Item!');
        nav('/');
        console.log(img);
      } catch (err) {
        console.error(err);
      }
    }
  };

  // !Uploading img to the Firestore Storage first ->
  // !Then we save img link and then we can add in Cloud Firestore ->
  const imageUploadHandler = (e) => {
    console.log(e.target.files[0]);
    const imgs = ref(imgDB, `imgs/${v4()}`);
    uploadBytes(imgs, e.target.files[0]).then((data) => {
      console.log(data, 'imgs');
      getDownloadURL(data.ref).then((val) => {
        setImg(val);
      });
    });
  };

  const dropdownBtnHandler = () => {
    setDropdown(!dropdown);
  };

  const categoryHandler = (e) => {
    setCategory(e.target.innerText);
    setDropdown(!dropdown);
  };

  return (
    <div className='h-screen w-screen justify-items-center '>
      <Toaster />
      <Header />
      <div className='md:flex justify-center items-start'>
        <div className='grid justify-items-center text-xl border-4 p-5 rounded-lg mx-6 mt-5 animate-fade-in-from-bottom md:w-4/6 h-5/6'>
          <p className='font-bold text-white text-3xl '>LIST ITEM</p>

          <form className='grid w-5/6 ' onSubmit={onSubmitHandler}>
            <div className='md:grid md:grid-cols-2 md:gap-20'>
              <div>
                <div className='mt-2'>
                  <p className='text-white'>Product Company</p>
                  <input
                    type='text'
                    placeholder='Company...'
                    className={inputClassNames}
                    onChange={(e) => {
                      setCompany(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className='mt-2'>
                  <p className='text-white'>Description</p>
                  <input
                    type='text'
                    placeholder='Description...'
                    className={inputClassNames}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                <div className='mt-2'>
                  <p className='text-white'>Name of the item</p>
                  <input
                    type='text'
                    placeholder='Name...'
                    className={inputClassNames}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>

              <div className='mt-2'>
                <p className='text-white'>Number / Size</p>
                <input
                  type='number'
                  placeholder='Number...'
                  required
                  className={inputClassNames}
                  onChange={(e) => {
                    setNumber(e.target.value);
                    required;
                  }}
                />
                <div className='mt-2'>
                  <p className='text-white'>Price</p>
                  <input
                    type='number'
                    required
                    placeholder='Price...'
                    className={inputClassNames}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                </div>
                <p className='mt-2 text-white'>Select Category</p>
                <button
                  onClick={dropdownBtnHandler}
                  id='dropdownDefaultButton'
                  data-dropdown-toggle='dropdown'
                  className='mt-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-2  border text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-lg md:w-fit'
                  type='button'
                >
                  Category{' '}
                  <svg
                    className='w-2.5 h-2.5 ms-3'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 10 6'
                  >
                    <path stroke='currentColor' d='m1 1 4 4 4-4' />
                  </svg>
                </button>
                <div>
                  <div
                    id='dropdown'
                    required
                    className={`z-10 ${
                      !dropdown && 'hidden'
                    } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 mt-2 absolute`}
                  >
                    <ul
                      className='py-2 text-sm text-gray-700 dark:text-gray-200'
                      aria-labelledby='dropdownDefaultButton'
                    >
                      <li>
                        <a
                          onClick={(e) => categoryHandler(e)}
                          href='#'
                          className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                        >
                          casual
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={(e) => categoryHandler(e)}
                          href='#'
                          className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                        >
                          basketball
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={(e) => categoryHandler(e)}
                          href='#'
                          className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                        >
                          football
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={(e) => categoryHandler(e)}
                          href='#'
                          className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                        >
                          boots
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={(e) => categoryHandler(e)}
                          href='#'
                          className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                        >
                          hoodie
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={(e) => categoryHandler(e)}
                          href='#'
                          className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                        >
                          jacket
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={(e) => categoryHandler(e)}
                          href='#'
                          className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                        >
                          pants
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={(e) => categoryHandler(e)}
                          href='#'
                          className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                        >
                          socks
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={(e) => categoryHandler(e)}
                          href='#'
                          className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                        >
                          t-shirt
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={(e) => categoryHandler(e)}
                          href='#'
                          className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                        >
                          underwear
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <p className='text-white text-center'>
              Selected Category: {`${category ? category : 'None'}`}
            </p>
            <div className='text-center border mx-4 py-4 rounded-xl mt-4 text-white'>
              <p className='text-xl'>Upload image :</p>
              <input
                required
                className='text-xl w-full px-12 my-4'
                type='file'
                onChange={(e) => imageUploadHandler(e)}
                multiple
              />
            </div>
            <div className='my-2'>
              <label className='text-white'>New</label>
              <input
                type='checkbox'
                className='ml-3'
                onChange={(e) => {
                  setIsNew(e.target.checked);
                }}
              />
            </div>
            <button
              className='border m-4 rounded-md p-2 bg-sky-200 text-black  font-bold'
              type='submit'
            >
              List Item
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
