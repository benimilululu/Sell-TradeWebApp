import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../config/firebase';
import { getDocs, collection } from 'firebase/firestore';
import Header from '../components/Header';

import { InfinitySpin } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

export default function CategoryDynamic() {
  const params = useParams();

  const [listedItems, setListedItems] = useState([]);

  const [showItems, setShowItems] = useState('');

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
        console.log(filteredItems);
        return filteredItems;
      } catch (err) {
        console.error(err);
      }
    };
    getListedItems();
  }, []);

  const wait = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  useEffect(() => {
    const noItems1 = async () => {
      // Do something after the delay
      await wait(10000);
      setShowItems(false);
    };
    noItems1();
  }, []);

  return (
    <div className='text-center w-screen  h-screen text-white overflow-y-scroll'>
      <Header />
      <div className='animate-fade-in-from-bottom '>
        <p className='mt-5 text-2xl font-bold text-white'>
          {params.cat.toUpperCase()}
        </p>
        <div className='md:grid md:grid-cols-4 md:gap-5 md:m-4'>
          {showItems === false && (
            <p className='mt-20 text-white font-bold text-2xl'>
              Sorry there are no items in this Category . . .
            </p>
          )}
          {showItems === '' && (
            <p>
              <div className='h-5/6 flex items-center justify-center '>
                <InfinitySpin
                  visible={true}
                  size={100}
                  color='white'
                  ariaLabel='infinity-spin-loading'
                />
              </div>
            </p>
          )}
          <FilteringItems
            items={listedItems}
            params={params.cat}
            showItems={setShowItems}
          />
        </div>
      </div>
    </div>
  );
}

const FilteringItems = ({ items, params, showItems }) => {
  const [showLoader, setShowLoader] = useState(true);
  const filteredItems = items?.filter((item) => item.Cat === params);



  const display = () => {
    if (filteredItems.length) {
      showItems(true);
      return filteredItems.map((item) => (
        <Link key={item.id} to={`/listed-item/${item.id}`}>
          <div
            key={item.id}
            className='flex justify-between border-4 p-4 rounded-2xl
           mx-5 md:mx-0 text-center text-xl  my-4 h-full flex-col md:hover:scale-105  md:duration-300 '
          >
            {showLoader && (
              <div className='h-5/6 flex items-center'>
                <InfinitySpin
                  visible={true}
                  size={100}
                  color='white'
                  ariaLabel='infinity-spin-loading'
                />
              </div>
            )}
            <img
              className='rounded-xl'
              src={item.ImageUrl}
              onLoad={() => setShowLoader(false)}
            />
            <div className=''>
              <p className='mt-5 '>
                Name: {item.Company} {item.Name}
              </p>
              <p>Size : {item.Number}</p>
              <p>Price : {item.Price}$</p>
              <p>Owner : {item.UserID.split('@')[0]}</p>
            </div>
          </div>
        </Link>
      ));
    } else {
      showItems(false)
    }
  };

  return display();
};
