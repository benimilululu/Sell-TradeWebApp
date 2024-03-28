import { useState, useEffect } from 'react';
import Header from './components/Header';
import Section1 from './components/Section1';
import Categories from './components/Categories';
import Recommended from './components/Recommended';
import AboutUs from './components/AboutUs';
import Login from './pages/Login';
import AllListedItems from './pages/AllListedItems';
import AddingItemTotList from './pages/AddingItemTotList';
import { db, auth } from './config/firebase';
import { getDocs, collection } from 'firebase/firestore';

function App() {
  const [listedItems, setListedItems] = useState([]);

  const listedItemsCollectionRef = collection(db, 'ListedItems');

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

  return (
    <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-fit'>
      <Header listedItems={listedItems} />
      <Section1 />
      <Categories />
      {/* <Recommended /> */}
      <AboutUs />
      {/* <AddingItemTotList /> */}
    </div>
  );
}

export default App;
