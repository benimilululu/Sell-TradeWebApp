import React, { useState } from 'react';
import ShoppingImage from '../images/pngegg.png';
import ReklamaImg from '../images/reklama.png'

export default function Section1({ loadedSection1Img }) {
  const [imgIsLoaded, setImgIsLoaded] = useState(false);
  const text = 'Your Online Shopping Buddy';

  return (
    <section>
      <div className='animate-fade-in-from-left justify-items-center md:h-fit  w-screen text-center md:flex md:items-center'>
        {imgIsLoaded && (
          <div className='grid justify-items-center mt-10 text-5xl text-white font-bold text-center md:w-3/6 md:h-full'>
            <p className='md:w-3/6 md:text-6xl cursor-default'>
              {text}
            </p>
          </div>
        )}

        <img
          src={ReklamaImg}
          className='mx-auto md:h-full'
          onLoad={() => {
            setImgIsLoaded(true);
            return loadedSection1Img();
          }}
          alt='Shopping'
        />
      </div>
    </section>
  );
}
