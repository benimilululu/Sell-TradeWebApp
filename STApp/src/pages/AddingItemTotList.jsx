import React, { useState } from 'react';
import { auth, db, imgDB } from '../config/firebase';
import { getDocs, collection, addDoc } from 'firebase/firestore';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Header from '../components/Header';

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

  const listedItemsCollectionRef = collection(db, 'ListedItems');

  // !Adding data to Cloud Firestore ->
  const onSubmitHandler = async () => {
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
      });
      console.log(img);
    } catch (err) {
      console.error(err);
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
    <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-screen'>
      <Header />
      <div className='grid justify-items-center text-xl border rounded-lg mx-2'>
        <p className='mt-4 font-bold text-white'>List Item :</p>

        <div className='flex'>
          <input
            type='text'
            placeholder='Company...'
            className='my-2 rounded-md'
            onChange={(e) => {
              setCompany(e.target.value);
            }}
          />
        </div>
        <input
          type='text'
          placeholder='Description...'
          className='my-2 rounded-md'
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type='text'
          placeholder='Name...'
          className='my-2 rounded-md'
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type='number'
          placeholder='Number...'
          className='my-2 rounded-md'
          onChange={(e) => {
            setNumber(e.target.value);
          }}
        />
        <input
          type='number'
          placeholder='price...'
          className='my-2 rounded-md'
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />

        <button
          // onClick={(e) => console.log(e.target.value)}
          onClick={dropdownBtnHandler}
          id='dropdownDefaultButton'
          data-dropdown-toggle='dropdown'
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-2 py-1 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-lg'
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
            <path
              stroke='currentColor'
              // stroke-linecap='round'
              // stroke-linejoin='round'
              // stroke-width='2'
              d='m1 1 4 4 4-4'
            />
          </svg>
        </button>
        <div>
          <div
            id='dropdown'
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
            </ul>
          </div>
        </div>

        <p>{category}</p>

        <div className='text-center border mx-4 py-4 rounded-xl mt-4'>
          <p className='text-xl'>Upload images :</p>
          <input
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
          className='border m-4 rounded-md p-2 bg-indigo-700 text-white'
          onClick={onSubmitHandler}
        >
          List Item
        </button>
      </div>
    </div>
  );
}
