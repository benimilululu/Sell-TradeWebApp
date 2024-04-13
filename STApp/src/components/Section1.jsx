import React, { useState } from 'react';
import ShoppingImage from '../images/pngegg.png';
import ReklamaImg from '../images/reklama.png'

export default function Section1({ loadedSection1Img }) {
  const [imgIsLoaded, setImgIsLoaded] = useState(false);
  const text = 'Your Online Shopping Buddy';

  return (
    <section>
      <div className='animate-fade-in-from-left justify-items-center md:h-fit  w-screen text-center'>
        {/* animated text -> */}
        {/* <a href='https://check.so' className='btn-shine text-4xl font-bold text-white ' target='_blank'>
          Get early access
        </a> */}
        {imgIsLoaded && (
          <div className='grid justify-items-center mt-10 text-5xl text-white font-bold text-center'>
            {text}
          </div>
        )}

        <img
          src={ReklamaImg}
          className='mx-auto md:h-96'
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
