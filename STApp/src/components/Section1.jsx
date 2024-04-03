import React, { useState } from 'react';
import ShoppingImage from '../images/pngegg.png';

export default function Section1({ loadedSection1Img }) {
  const [imgIsLoaded, setImgIsLoaded] = useState(false);
  const text = 'Your Online Shopping Buddy';

  return (
    <section>
      <div>
        {imgIsLoaded && (
          <div className='grid justify-items-center mt-10 text-5xl text-white font-bold text-center'>
            {text}
          </div>
        )}

        <img
          src={ShoppingImage}
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
