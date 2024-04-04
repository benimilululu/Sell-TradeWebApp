import React, { useState, useEffect, useContext } from 'react';
import Header from '../components/Header';
import { AuthContext } from '../context/AuthContext';

import { auth } from '../config/firebase';
import { db } from '../config/firebase';
import { getDocs, collection } from 'firebase/firestore';
import { Fade } from 'react-reveal';

export default function Profile() {
  // const userEmail = auth?.currentUser?.email;

  const { currentUser } = useContext(AuthContext);


  // console.log(userEmail)

  return (
    <div className='h-screen overflow-scroll'>
      <Header />
      <div className='text-center m-5 border-4 rounded-2xl p-5 text-2xl text-white animate-fade-in-from-bottom'>
        <p>My Profile</p>
        <p className='mt-4'>Email: {currentUser.email}</p>
        <div className='mt-5'></div>
      </div>
      <div className='text-center m-5 border-4 rounded-2xl p-5 text-2xl text-white overflow-scroll animate-fade-in-from-bottom'>
        <p>My Listing's</p>
        <GetFilteredItems user={currentUser.email} />
      </div>
    </div>
  );
}

const GetFilteredItems = ({user}) => {
  const [listedItems, setListedItems] = useState([]);

  const listedItemsCollectionRef = collection(db, 'ListedItems');

  useEffect(() => {
    const getListedItems = async () => {
      try {
        const items = await getDocs(listedItemsCollectionRef);
        const filteredItems = items.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setListedItems(filteredItems);
        // console.log(filteredItems);
      } catch (err) {
        console.error(err);
      }
    };
    getListedItems();
  }, []);

  const filteredItems = listedItems?.filter((item) => {
    return item.UserID === user
    console.log(user, item.UserID);
  });

  if (filteredItems.length) {
    return filteredItems.map((item) => (
      <div
        key={item.id}
        className='border p-4 rounded-2xl
           mx-5 text-center text-xl text-black my-4'
      >
        <img className='rounded-xl' src={item.ImageUrl} />
        <p className='mt-5'>
          Name: {item.Company} {item.Name}
        </p>
        <p>Size : {item.Number}</p>
        <p>Price : {item.Price}$</p>
        <p>Owner : {item.UserID}</p>
      </div>
    ));
  } else {
    return (
      <p className='mt-20 text-white font-bold text-2xl'>
        You have no listing's yet . . .
      </p>
    );
  }
};
