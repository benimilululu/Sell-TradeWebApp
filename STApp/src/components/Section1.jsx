import React from 'react';
import ShoppingImage from '../images/pngegg.png';

export default function Section1() {
  const text = 'Your Online Shopping Buddy';
  return (
    <section>
      <div className='grid justify-items-center mt-10 text-3xl font-bold text-center'>{text}</div>
      <img src={ShoppingImage} alt='Shopping' />
    </section>
  );
}
