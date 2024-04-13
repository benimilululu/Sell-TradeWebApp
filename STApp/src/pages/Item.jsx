import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { db, auth } from '../config/firebase';
import { getDocs, collection } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import Header from '../components/Header';

export default function Item() {
  const params = useParams();
  const [listedItems, setListedItems] = useState([]);
  const { currentUser } = useContext(AuthContext);

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

  return (
    <div className=' text-center h-screen overflow-scroll'>
      <Header />
      <FilteringItems
        items={listedItems}
        name={params.itemId}
        currentUser={currentUser}
      />
    </div>
  );
}

const FilteringItems = ({ items, name, currentUser }) => {
  const navigate = useNavigate();

  const handleButtonClick = (itemID, UserID) => {
    navigate('/chat', { state: { action: `${itemID + '/' + UserID}` } });
  };

  return items
    ?.filter((item) => item.Name.toLowerCase().includes(name.toLowerCase()))
    .map((item) => (
      <div
        key={item.id}
        className='border-4 p-4 rounded-2xl
           m-5 text-center text-xl text-white'
      >
        <img className='rounded-xl' src={item.ImageUrl} />
        <p className='mt-5'>
          Name: {item.Company} {item.Name}
        </p>
        <p>Size : {item.Number}</p>
        <p>Price : {item.Price}$</p>
        <p>Owner : {item.UserID.split('@')[0]}</p>
        {currentUser && currentUser.email !== item.UserID && (
          <button
            className='border-4 p-1 rounded-xl m-2'
            onClick={() => handleButtonClick(item.uid, item.UserID)}
          >
            Send Message
          </button>
         )}
         {!currentUser && 
         <Link to='/login'>
           <button
            className='border-4 p-2 rounded-xl m-2'
            // onClick={}
          >
            Sign in to send Message
          </button>
         </Link>
         }
      </div>
    ));
};
