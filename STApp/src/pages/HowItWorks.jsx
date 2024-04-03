import React from 'react';
import Header from '../components/Header';

export default function HowItWorks() {
  return (
    <div className='h-screen'>
      <Header />
      <div className='text-center pt-10 text-2xl text-white border-2 rounded-lg m-4 p-3 pb-10'>
        <p className='text-3xl'>How it works?</p>
        <p className='mt-10'>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </div>
    </div>
  );
}
