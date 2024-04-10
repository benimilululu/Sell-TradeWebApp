import { useState, useEffect, useContext, useRef } from 'react';
import Header from './components/Header';
import Section1 from './components/Section1';
import Categories from './components/Categories';
import AboutUs from './components/AboutUs';
import { db, auth } from './config/firebase';
import { getDocs, collection } from 'firebase/firestore';
import { AuthContext } from './context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';

import { InfinitySpin } from 'react-loader-spinner';

import { useLocation } from 'react-router-dom';

function App() {
  const [listedItems, setListedItems] = useState([]);
  const [overflowScroll, setOverflowScroll] = useState(true);

  const [showLoader, setShowLoader] = useState(true);

  const listedItemsCollectionRef = collection(db, 'ListedItems');

  const { currentUser } = useContext(AuthContext);

  const location = useLocation();
  const { action } = location.state || {};
  // console.log(action.state?.action);

  const categoriesRef = useRef(null);

  const aboutMeRef = useRef(null);

  const scrollToCategories = () => {
    categoriesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAboutUs = () => {
    aboutMeRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Accessing the action property from location.state
    if (action) {
      // console.log('Action received:', action);
      if (action === 'categories') {
        console.log('Action received:', action);
        setTimeout(() => {
          scrollToCategories()
        }, 1000)
      }
      if (action === 'about') {
        setTimeout(() => {
         scrollToAboutUs()
        }, 1000);
      }
    }
    // Do something with the action...
  }, [action]);

  //  const location = useLocation();

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

          <Header
            listedItems={listedItems}
            scrollHandler={scrollHandler}
            currentUser={currentUser}
            categoriesRef={categoriesRef}
            scrollToCategories={scrollToCategories}
            scrollToAboutUs={scrollToAboutUs}
          />

          <Section1 loadedSection1Img={loaderHandler} />

          <div ref={categoriesRef}>
            <Categories />
          </div>

          <div ref={aboutMeRef}>
            <AboutUs />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
