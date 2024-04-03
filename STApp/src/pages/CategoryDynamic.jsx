import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../config/firebase';
import { getDocs, collection } from 'firebase/firestore';
import Header from '../components/Header';

export default function CategoryDynamic() {
  const params = useParams();

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

  return (
    <div className='text-center  h-screen text-white overflow-scroll'>
      <Header />
      <p className='mt-5 text-2xl font-bold text-white'>
        {params.cat.toUpperCase()}
      </p>
      <FilteringItems items={listedItems} params={params.cat} />
    </div>
  );
}

const FilteringItems = ({ items, params }) => {
  const filteredItems = items?.filter((item) => item.Cat === params);

  const display = () => {
    if (filteredItems.length) {
      return filteredItems.map((item) => (
        <div
          key={item.id}
          className='border-4 p-4 rounded-2xl
           mx-5 text-center text-xl  my-4'
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
          Sorry there are no items in this Category . . .
        </p>
      );
    }
  };

   return display()

  //   return items
  //     ?.filter((item) => item.Cat === params)
  //     .map((item) => (
  //       <div
  //         key={item.id}
  //         className='border p-4 rounded-2xl
  //            mx-5 text-center text-xl text-black my-4'
  //       >
  //         <img className='rounded-xl' src={item.ImageUrl} />
  //         <p className='mt-5'>
  //           Name: {item.Company} {item.Name}
  //         </p>
  //         <p>Size : {item.Number}</p>
  //         <p>Price : {item.Price}$</p>
  //         <p>Owner : {item.UserID}</p>
  //       </div>
  //     ));
};
