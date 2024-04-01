import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
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
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import Header from '../components/Header';
import Messages from '../components/Messages';

export default function Chat() {
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState([]);
  const [err, setErr] = useState('');

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const searchResultHandler = async () => {
      const q = query(collection(db, 'users'));

      const querySnapshot = await getDocs(q);

      const allUsers = [];

      await querySnapshot.forEach((doc) => allUsers.push(doc.data()));

      setUser(allUsers);
    };

    searchResultHandler();
  }, []);

  const ChatGenerator = () => {
    const [chat, setChats] = useState([]);

    useEffect(() => {
      const getChats = () => {
        const unSub = onSnapshot(
          doc(db, 'chatUsers', currentUser.uid),
          (doc) => {
            setChats(doc.data());
            // console.log(doc.data());
          }
        );

        return () => {
          unSub();
        };
      };

      currentUser.uid && getChats();
    }, [currentUser.uid]);

    const selectHandler = (u) => {
      dispatch({ type: 'CHANGE_USER', payload: u });
    };

    return (
      <div>
        {Object.entries(chat)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat) => (
            <div
              key={chat[0]}
              className='border-2 w-11/12 m-auto mt-3 rounded p-2 text-white overflow-hidden'
              onClick={() => selectHandler(chat[1].userInfo)}
            >
              <p>{chat[1].userInfo.email}</p>
              <p>{chat[1].lastMessage?.text}</p>
            </div>
          ))}
        <Messages />
      </div>
    );
  };

  return (
    <div>
      <div className='flex justify-center items-center h-screen bg-gradient-to-b from-cyan-700 via-cyan-900 to-gray-900'>
        <div className='h-5/6 border-4 w-5/6 m-auto justify-center items-center rounded-lg'>
          <p className='text-center text-xl font-bold mt-2 text-white'>
            TopFindChat
          </p>
          <div className='flex justify-center items-center mt-2'>
            <input
              className='border-black w-4/5 h-10 m-auto rounded-xl p-2'
              placeholder='Search chat'
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </div>
          <FilteringItems
            items={user}
            searchBarValue={userName}
            currUser={currentUser}
          />
          <div className='mt-6 text-white text-xl'>
            <p className='mx-2 border-b-2'>Messages</p>
            <ChatGenerator />
          </div>
        </div>
      </div>
    </div>
  );
}

const FilteringItems = ({ items, searchBarValue, currUser }) => {
  if (searchBarValue.length > 0) {
    return items
      ?.filter((item) =>
        item.email.toLowerCase().includes(searchBarValue.toLowerCase())
      )
      .map((item, i) => {
        const handleClick = async () => {
          const combinedId =
            currUser.uid > item.uid
              ? currUser.uid + item.uid
              : item.uid + currUser.uid;
          try {
            const res = await getDoc(doc(db, 'chats', combinedId));

            if (!res.exists()) {
              //create a chat in chats collection
              await setDoc(doc(db, 'chats', combinedId), { messages: [] });

              //create user chats
              await updateDoc(doc(db, 'chatUsers', currUser.uid), {
                [combinedId + '.userInfo']: {
                  uid: item.uid,
                  email: item.email,
                },
                [combinedId + '.date']: serverTimestamp(),
              });

              await updateDoc(doc(db, 'chatUsers', item.uid), {
                [combinedId + '.userInfo']: {
                  uid: currUser.uid,
                  email: currUser.email,
                },
                [combinedId + '.date']: serverTimestamp(),
              });
            }
          } catch (err) {
            console.error(err);
          }
        };

        return (
          <div
            key={item.uid}
            className='border-2 w-11/12 m-auto mt-3 rounded p-2 text-white overflow-hidden'
            onClick={() => handleClick()}
          >
            {item.email}
          </div>
        );
      });
  }
};
