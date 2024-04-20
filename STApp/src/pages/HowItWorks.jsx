import React from 'react';
import Header from '../components/Header';

export default function HowItWorks() {
  const welcomeText = `Welcome to our app, where fashion meets convenience! With our user-friendly platform, you can effortlessly buy and sell a wide range of stylish clothing, shoes, and accessories. Whether you're looking to refresh your wardrobe or declutter your closet, our app offers a seamless experience for both buyers and sellers.`;

  const text1 = `Browse through our curated collection of trendy clothes and shoes from various brands and designers, or showcase your own items to a community of fashion enthusiasts. From vintage finds to the latest fashion trends, our app caters to every style and budget.`;

  const text2 = `With secure transactions and easy-to-use features, buying and selling on our platform is a breeze. Join our vibrant community today and discover endless possibilities to express your unique style while finding new homes for your pre-loved fashion pieces. Happy shopping and selling!`;

  const textStyle = `mt-10 p-4`;

  return (
    <div className='h-screen'>
      <Header />
      <div className='text-center pt-10 text-2xl md:w-4/6 m-auto text-white border-2 rounded-lg p-3 pb-10'>
        <p className='text-3xl border-b-4 w-fit m-auto'>How it works ?</p>
        <p className={textStyle}>{welcomeText}</p>
        <p className={textStyle}>{text1}</p>
        <p className={textStyle}>{text2}</p>
      </div>
    </div>
  );
}
