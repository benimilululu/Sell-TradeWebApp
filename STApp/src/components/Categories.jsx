import React, { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { getDocs, collection } from 'firebase/firestore';

export default function Categories() {
  const categories = ['basketball', 'casual', 'football'];

  const [categories1, setCategories1] = useState([]);
  const [categories2, setCategories2] = useState([]);

  const categoriesCollectionRef = collection(db, 'Catrgories');

  useEffect(() => {
    const getListedItems = async () => {
      try {
        const items = await getDocs(categoriesCollectionRef);
        const filteredItems = items.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setCategories1(filteredItems);
        console.log(filteredItems);
        const clothes = filteredItems[0].clothes.map((e) => e);
        const shoes = filteredItems[0].shoes.map((e) => e);
        setCategories1(clothes);
        setCategories2(shoes);
        console.log(categories1);
      } catch (err) {
        console.error(err);
      }
    };
    getListedItems();
  }, []);

  return (
    <section className='text-black text-center'>
      <p className='text-3xl font-bold text-white text-center'>Categories</p>
      <div className=''>
        <p className='text-2xl font-bold text-white mt-10'>Shoes</p>
        <div className='grid grid-cols-2 gap-4 text-white mx-4 align-text-bottom'>
          <CategoriesHandler cat={categories2} />
        </div>
      </div>
      <div>
        <p className='text-2xl font-bold text-white mt-10'>Clothes</p>
        <div className='grid grid-cols-2 gap-4 text-white mx-4 align-text-bottom'>
          <CategoriesHandler cat={categories1} />
        </div>
      </div>
    </section>
  );
}

const CategoriesHandler = ({ cat }) => {
  return cat.map((e) => (
    <div
      className='relative border rounded-2xl h-48  align-text-bottom'
      key={e}
    >
      <p className='absolute inset-x-0 bottom-0'> {e}</p>
    </div>
  ));
};
