import React from 'react';

export default function AboutUs() {
  const text = `When looking for a platform to buy and sell items, it's paramount to choose one that not only offers a vast selection and great deals but also prioritizes the safety and security of its users. Our website is designed with these core principles in mind, ensuring a seamless and secure experience for all our customers. 
  
  `;

  const trustAndSecurity = `We understand the importance of trust in online transactions. That's why we've implemented state-of-the-art security measures to protect your personal information and transaction details. Our platform uses advanced encryption technology to safeguard your data, and our secure payment gateway ensures that your financial information is protected at every step of the purchase process.

`;

  const userFriendlyExperience = `Our website's intuitive design and easy navigation make buying and selling straightforward and hassle-free. Whether you're listing an item for sale or searching for the perfect purchase, our platform is designed to provide a smooth and efficient experience.
  
  `;

  const AboutMeText = () => { 
    return (
      <div
        className='text-xl mt-10  font-serif mx-5 grid md:grid-cols-3 items-top'
        style={{ whiteSpace: 'pre-line' }}
      >
        <div >
          <p className='font-bold w-fit m-auto text-3xl mb-4 border-b-2'>
            About TopFind
          </p>
          <p className='font-bold px-6 '>{text}</p>
        </div>
        <div className='px-6'>
          <p className=' font-bold text-3xl mb-4 m-auto border-b-2 w-fit'>
            Trust and Security
          </p>
          <p className='font-bold'>{trustAndSecurity}</p>
        </div>
        <div className='px-6'>
          <p className='font-bold mb-4 m-auto border-b-2 w-fit text-3xl'>
            User-Friendly Experience:
          </p>
          <p className='font-bold'> {userFriendlyExperience}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='text-center text-white text-3xl pb-10 mt-10'>
      <AboutMeText />
    </div>
  );
}
