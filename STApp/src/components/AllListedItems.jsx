import React, { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { getDocs, collection } from 'firebase/firestore';

export default function AllListedItems() {
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
        setListedItems(filteredItems)
        // console.log(filteredItems);
      } catch (err) {
        console.error(err);
      }
    };
    getListedItems();
  }, []);

  return (
    <div className='mt-5'>
      <p>All listed items :</p>
      {listedItems.map((item) => (
        <div key={item.id} className='border w-fit p-4 rounded-3xl m-4'>
          <p>{item.Company}</p>
          <p>{item.Name}</p>
          <p>Size : {item.Number}</p>
          <p>{item.Price}$</p>
          <p>{item.Owner}</p>
        </div>
      ))}
      <p>.</p>
    </div>
  );
}
