import React, { useContext, useEffect, useState } from 'react';
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
import { useLocation } from 'react-router-dom';

import { MdOutlineArrowBackIosNew } from 'react-icons/md';

export default function Chat() {
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [err, setErr] = useState('');

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  const location = useLocation();
  const { action } = location.state || {};

  useEffect(() => {
    if (action) {
      // Perform your action here
      const userData = action.split('/');
      const user = {
        uid: userData[0],
        email: userData[1],
      };

      if(currentUser.email !== user.email) {
          dispatch({ type: 'CHANGE_USER', payload: user });
      setChatOpen(!chatOpen);
      }
    }
  }, [action]);

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
      setChatOpen(!chatOpen);
    };

    return (
      <div className=' h-full'>
        {!chatOpen ? (
          <div className='animate-fade-in-from-bottom'>
            <p className='mx-2 mt-4 border-b-2'>Messages</p>
            {Object.entries(chat)
              ?.sort((a, b) => b[1].date - a[1].date)
              .map((chat) => (
                 <div
                  key={chat[0]}
                  className='border-2 w-11/12 m-auto mt-3 rounded p-2 text-white overflow-hidden'
                  onClick={() => {
                    selectHandler(chat[1].userInfo);
                    console.log(chat[1].userInfo);
                    setUserName('');
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
        ) : (
          <div className=' h-full'>
            {' '}
            <Messages />{' '}
            {/* <button onClick={() => setChatOpen(!chatOpen)}>back</button> */}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className='relative h-screen w-screen'>
      <Header />
      <div className='flex  items-center h-5/6 animate-fade-in-from-bottom'>
        <div className='h-full overflow-scroll mt-5 border-4 w-5/6 m-auto justify-center items-center rounded-lg '>
          {chatOpen && (
            <div className='relative' onClick={() => setChatOpen(!chatOpen)}>
              <MdOutlineArrowBackIosNew className='text-white mt-2 ml-2 text-2xl absolute' />
              <span className='absolute mt-2 ml-7 text-white'>back</span>
            </div>
          )}
          {!chatOpen && (
            <div>
              <p className='text-center text-xl font-bold mt-2 text-white'>
                TopFindChat
              </p>
              <div className='flex justify-center items-center mt-2'>
                <input
                  className='border-black w-4/5 h-10 m-auto rounded-xl p-2'
                  placeholder='Search User ...'
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                  // value={userName}
                />
              </div>
            </div>
          )}
          {!chatOpen && (
            <FilteringItems
              items={user}
              searchBarValue={userName}
              currUser={currentUser}
              setChatOpen={setChatOpen}
              chatOpen={chatOpen}
              setChatBarValue={setUserName}
            />
          )}
          <div className='h-full overflow-scroll  flex flex-col text-white text-xl'>
            <ChatGenerator />
          </div>
        </div>
      </div>
    </div>
  );
}

const FilteringItems = ({ items, searchBarValue, currUser, setChatOpen, chatOpen, setChatBarValue }) => {
  const { dispatch } = useContext(ChatContext);
  if (searchBarValue.length > 0) {
    return items
      ?.filter(
        (item) =>
          item.email !== currUser.email &&
          item.email.toLowerCase().includes(searchBarValue.toLowerCase())
      )
      .map((item, i) => {
        const handleClick = async () => {
          const combinedId =
            currUser.uid > item.uid
              ? currUser.uid + item.uid
              : item.uid + currUser.uid;
          // try {
            const res = await getDoc(doc(db, 'chats', combinedId));
            console.log('l')
            dispatch({ type: 'CHANGE_USER', payload: item });
            setChatBarValue('')
            setChatOpen(!chatOpen);
            
            // if (!res.exists()) {
            //   //create a chat in chats collection
            //   await setDoc(doc(db, 'chats', combinedId), { messages: [] });

            //   //create user chats
            //   await updateDoc(doc(db, 'chatUsers', currUser.uid), {
            //     [combinedId + '.userInfo']: {
            //       uid: item.uid,
            //       email: item.email,
            //     },
            //     [combinedId + '.date']: serverTimestamp(),
            //   });

            //   await updateDoc(doc(db, 'chatUsers', item.uid), {
            //     [combinedId + '.userInfo']: {
            //       uid: currUser.uid,
            //       email: currUser.email,
            //     },
            //     [combinedId + '.date']: serverTimestamp(),
            //   });

            //   //  const selectHandler = (u) => {
            //   //    dispatch({ type: 'CHANGE_USER', payload: u });
            //   //    setChatOpen(!chatOpen);
            //   //  };
            //   //  selectHandler(item)
            // setChatOpen(false);
               
            // }
          // } catch (err) {
          //   console.error(err);
          //   setChatOpen(false)
          // }
        };

        return (
          <div
            key={item.uid}
            className=' border-2 w-11/12 m-auto mt-3 rounded p-2 text-white overflow-hidden'
            onClick={() => handleClick()}
          >
            {item.email.split('@')[0]}
          </div>
        );
      });
  }
};
