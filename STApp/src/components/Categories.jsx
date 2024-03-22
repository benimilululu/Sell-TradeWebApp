import React from 'react';

export default function Categories() {
  const categories = ['basketball', 'casual', 'football'];



  return (
    <section className='text-black text-center'>
      <p className='text-3xl font-bold text-white'>Categories</p>
      <div className='grid grid-cols-3 gap-4 text-white my-10 mx-4 align-text-bottom'>
        <CategoriesHandler cat={categories} />
      </div>
    </section>
  );
}

const CategoriesHandler = ({ cat }) => {
  return cat.map((e) => (
    <div
      className='relative border rounded-2xl h-48  align-text-bottom'
      key={cat}
    >
      <p className='absolute inset-x-0 bottom-0'> {e}</p>
    </div>
  ));
};
