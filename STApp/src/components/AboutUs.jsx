import React from 'react';

export default function AboutUs() {
  const text = `When looking for a platform to buy and sell items, it's paramount to choose one that not only offers a vast selection and great deals but also prioritizes the safety and security of its users. Our website is designed with these core principles in mind, ensuring a seamless and secure experience for all our customers. 
  
  `;

  const trustAndSecurity = `We understand the importance of trust in online transactions. That's why we've implemented state-of-the-art security measures to protect your personal information and transaction details. Our platform uses advanced encryption technology to safeguard your data, and our secure payment gateway ensures that your financial information is protected at every step of the purchase process.

`;

  const userFriendlyExperience = `Our website's intuitive design and easy navigation make buying and selling straightforward and hassle-free. Whether you're listing an item for sale or searching for the perfect purchase, our platform is designed to provide a smooth and efficient experience.
  
  `;

  const supportAndAssurance = `We stand behind our users with a dedicated support team ready to assist with any questions or concerns. Our buyer protection policies and seller guidelines are in place to ensure fair and honest transactions, giving you peace of mind whether you're buying or selling.
  
  `;

  const communityAndReviews = `Our vibrant community of buyers and sellers and our transparent review system contribute to an environment where you can shop and sell with confidence. See feedback from other users to guide your buying decisions and feel secure in knowing you're dealing with reputable sellers.
  
  `;

  const commitment = `Our commitment to creating a safe, secure, and enjoyable environment for buying and selling items sets us apart. Whether you're a seasoned seller or a first-time buyer, our website offers a reliable platform where you can transact with confidence, knowing that we've got your back every step of the way.`;

  const AboutMeText = () => { 
    return <div
      className='text-xl mt-10  font-serif mx-5'
      style={{ whiteSpace: 'pre-line' }}
    >
      <p className='font-bold'>{text}</p>
      <p className='font-bold'>Trust and Security:</p>
      <p>{trustAndSecurity}</p>
      <p className='font-bold'>User-Friendly Experience:</p>
      <p> {userFriendlyExperience}</p>
      <p className='font-bold'>Support and Assurance: </p>
      <p>{supportAndAssurance}</p>
      <p className='font-bold'>Community and Reviews:</p>
      <p> {communityAndReviews}</p>
      <p className='font-bold'> {commitment}</p>
    </div>;
  }

  return (
    <div className='text-center text-white text-3xl pb-10 mt-10 w-screen'>
      <p className='font-bold'>About TopFind</p>
      <AboutMeText />
    </div>
  );
}
