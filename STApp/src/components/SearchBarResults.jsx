import React from 'react';
import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
import { db } from '../config/firebase';

import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
  onSnapshot,
} from 'firebase/firestore';

export default function SearchBarResults({
  items,
  searchBarValue,
  currUser,
  setChatOpen,
  chatOpen,
  setChatBarValue,
  setSearchResultsOpen,
}) {
  const { dispatch } = useContext(ChatContext);

  const handleClick = async (item) => {
      setChatBarValue('');
    const combinedId =
      currUser.uid > item.uid
        ? currUser.uid + item.uid
        : item.uid + currUser.uid;
    const res = await getDoc(doc(db, 'chats', combinedId));
    dispatch({ type: 'CHANGE_USER', payload: item });
    setChatOpen(!chatOpen);
  };

  const isSearchResultsOpen = (e) => {
    setSearchResultsOpen(e)
  }

  if (searchBarValue.length > 0) {
    isSearchResultsOpen(true)
    return items
      ?.filter(
        (item) =>
          item.email !== currUser.email &&
          item.email.toLowerCase().includes(searchBarValue.toLowerCase())
      )
      .map((item, i) => {
        return (
          <div
            key={item.uid}
            className=' border-2 w-11/12 m-auto mt-3 rounded p-2 text-white overflow-hidden  md:hover:scale-105  md:duration-300 z-0  md:hover:bg-teal-600 cursor-pointer'
            onClick={() => handleClick(item)}
          >
            {item.email.split('@')[0]}
          </div>
        );
      });
  } else {
    isSearchResultsOpen(false);

  }
}
