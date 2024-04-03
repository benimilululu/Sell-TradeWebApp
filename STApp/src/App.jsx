import { useState, useEffect, useContext } from 'react';
import Header from './components/Header';
import Section1 from './components/Section1';
import Categories from './components/Categories';
import AboutUs from './components/AboutUs';
import { db, auth } from './config/firebase';
import { getDocs, collection } from 'firebase/firestore';
import { AuthContext } from './context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';

import { InfinitySpin } from 'react-loader-spinner';

import { Fade } from 'react-reveal';

function App() {
  const [listedItems, setListedItems] = useState([]);
  const [overflowScroll, setOverflowScroll] = useState(true);

  const [showLoader, setShowLoader] = useState(true);

  const listedItemsCollectionRef = collection(db, 'ListedItems');

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getListedItems = async () => {
      try {
        const items = await getDocs(listedItemsCollectionRef);
        const filteredItems = items.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setListedItems(filteredItems);
        // console.log(filteredItems);
      } catch (err) {
        console.error(err);
      }
    };
    getListedItems();
  }, []);

  const scrollHandler = () => {
    setOverflowScroll(!overflowScroll);
  };

  const loaderHandler = () => {
    setShowLoader(false);
    // toast.success('Welcome!');
  };

  return (
    <div
      className={`h-screen ${
        overflowScroll ? 'overflow-scroll' : 'overflow-hidden'
      } w-fit`}
    >
      <Toaster />
      {showLoader ? (
        <div className='h-screen w-screen'>
          {/* <Header
              listedItems={listedItems}
              scrollHandler={scrollHandler}
              currentUser={currentUser}
            />
      */}

          <Section1 loadedSection1Img={loaderHandler} />
          <div className='h-5/6 flex items-center justify-center'>
            <InfinitySpin
              visible={true}
              size={100}
              color='white'
              ariaLabel='infinity-spin-loading'
            />
          </div>
        </div>
      ) : (
        <>
          <Toaster />
          <Fade top>
            <Header
              listedItems={listedItems}
              scrollHandler={scrollHandler}
              currentUser={currentUser}
            />
          </Fade>

          <Fade right>
            <Section1 loadedSection1Img={loaderHandler} />
          </Fade>
          <Fade left>
            <Categories />
          </Fade>
          <AboutUs />
        </>
      )}
    </div>
  );
}

export default App;
