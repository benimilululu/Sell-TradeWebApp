import Messages from '../components/Messages';
import { useState, useEffect, useContext } from 'react';
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
import { db } from '../config/firebase';
import { ChatContext } from '../context/ChatContext';

export default function MdChatGenerator({ currentUser, setUserName, emptySearchBar }) {
  const { dispatch } = useContext(ChatContext);

  const [chat, setChats] = useState([]);

  useEffect(() => {
    const getChats = () => {
      const unSub = onSnapshot(doc(db, 'chatUsers', currentUser.uid), (doc) => {
        setChats(doc.data());
        // console.log(doc.data());
      });

      return () => {
        unSub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const selectHandler = (u) => {
    dispatch({ type: 'CHANGE_USER', payload: u });
    setUserName('');
  };

  return (
    <div className=' grid grid-cols-3 m-auto h-4/6'>
      <div className='animate-fade-in-from-bottom border-4 rounded-xl m-4 overflow-y-scroll p-2 max-h-svh'>
        <p className='mx-2 mt-4 border-b-2 text-white'>Messages</p>
        {Object.entries(chat)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat) => (
            <div
              key={chat[0]}
              className='border-2 w-11/12 m-auto mt-3 rounded p-2 text-white md:hover:scale-105  md:duration-300 z-0  md:hover:bg-teal-600 cursor-pointer overflow-hidden'
              onClick={() => {
                selectHandler(chat[1].userInfo);
                setUserName('')
              }}
            >
              <p className='text-2xl font-bold'>
                {chat[1]?.userInfo.email.split('@')[0].toUpperCase()}
              </p>
              <p
                className='text-lg'
                onClick={() =>
                  console.log(
                    new Date(
                      chat[1].date.seconds * 1000 +
                        chat[1].date.nanoseconds / 1000000
                    )
                  )
                }
              >
                Messages: {chat[1].lastMessage?.text}
                {/* <ConvertToRealDate
                      a={chat[1].date.seconds}
                      b={chat[1].date.nanoseconds}
                    /> */}
              </p>
            </div>
          ))}
      </div>
      <div className='col-span-2'>
        {/* {' '} */}
        <Messages />{' '}
      </div>
    </div>
  );
}
