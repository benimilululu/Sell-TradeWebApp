import React, { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { getDocs, collection } from 'firebase/firestore';
import { Link } from 'react-router-dom';

import { InfinitySpin } from 'react-loader-spinner';

export default function Categories() {
  const [cat1, setCat1] = useState([]);
  const [cat2, setCat2] = useState([]);

  const [showCategories, setShowCategories] = useState(false);

  const categoriesCollectionRef = collection(db, 'Catrgories');

  useEffect(() => {
    const getListedItems = async () => {
      try {
        const items = await getDocs(categoriesCollectionRef);
        const filteredItems = items.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        const shoesCategories = filteredItems[0].cat.shoes;
        const arr = [];
        const insideCat = Object.entries(shoesCategories).map(
          ([key, value], index) => {
            const newObj = {
              cat: key,
              img: value.img,
            };
            return arr.push(newObj);
          }
        );
        setCat1(arr);

        const clothesCategories = filteredItems[0].cat.clothes;
        const arr2 = [];
        const insideClothesCat = Object.entries(clothesCategories).map(
          ([key, value], index) => {
            const newObj = {
              cat: key,
              img: value.img,
            };
            return arr2.push(newObj);
          }
        );
        setCat2(arr2);
      } catch (err) {
        console.error(err);
      }
    };
    getListedItems();
  }, []);

  return (
    <section className='text-black text-center border-y-4 pt-1 pb-5 animate-fade-in-from-bottom '>
      <p className='text-3xl font-bold text-white text-center'>Categories</p>
      {showCategories ? (
        <div className='animate-fade-in-from-bottom'>
          <p className='mt-2 text-2xl text-white font-bold text-start ml-4'>
            Shoes
          </p>
          <div className='grid grid-cols-2 gap-4 text-white mx-4 align-text-bottom'>
            <CategoriesHandler2
              cat={cat1}
              setShowCategories={setShowCategories}
            />
          </div>
          <div>
            <p className='mt-10 text-2xl text-white font-bold text-start ml-4'>
              Clothes
            </p>
            <div className='grid grid-cols-2 gap-4 text-white mx-4 align-text-bottom'>
              <CategoriesHandler2
                cat={cat2}
                setShowCategories={setShowCategories}
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className='h-5/6 flex items-center justify-center pb-44'>
            <InfinitySpin
              visible={true}
              size={100}
              color='white'
              ariaLabel='infinity-spin-loading'
            />
          </div>
          <div className='grid grid-cols-2 gap-4 text-white mx-4 align-text-bottom'>
            <CategoriesHandler2
              cat={cat1}
              setShowCategories={setShowCategories}
            />
          </div>
        </>
      )}
    </section>
  );
}

const CategoriesHandler2 = ({ cat, setShowCategories }) => {

  return cat.map((obj, index) => (
    <Link to={`/categories/${obj.cat}`}>
      <div
        className='border-4 rounded-2xl h-48  align-text-bottom mb-5'
        key={index + 1}
      >
        <img
          className='rounded-xl h-full w-full object-cover'
          onLoad={() => setShowCategories(true)}
          src={obj.img}
        />
        <p className='text-xl mt-1'>{obj.cat}</p>
      </div>
    </Link>
  ));
};
