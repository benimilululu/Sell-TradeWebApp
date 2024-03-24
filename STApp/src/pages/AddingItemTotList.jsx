import React, { useState } from 'react';
import { auth, db, imgDB } from '../config/firebase';
import { getDocs, collection, addDoc } from 'firebase/firestore';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Header from '../components/Header';

export default function AddingItemTotList() {
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [price, setPrice] = useState('');
  const [isNew, setIsNew] = useState('');
  const [img, setImg] = useState('');

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

  return (
    <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-screen'>
      <Header />
      <div className='grid justify-items-center text-2xl border rounded-lg m-10'>
        <p className='mt-4 font-bold text-white'>List Item :</p>
        <div className='flex'>
          <input
            type='text'
            placeholder='Company...'
            className='my-4 rounded-md'
            onChange={(e) => {
              setCompany(e.target.value);
            }}
          />
        </div>
        <input
          type='text'
          placeholder='Description...'
          className='my-4 rounded-md'
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type='text'
          placeholder='Name...'
          className='my-4 rounded-md'
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type='number'
          placeholder='Number...'
          className='my-4 rounded-md'
          onChange={(e) => {
            setNumber(e.target.value);
          }}
        />
        <input
          type='number'
          placeholder='price...'
          className='my-4 rounded-md'
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <div className='text-center border mx-4 py-4 rounded-xl'>
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
