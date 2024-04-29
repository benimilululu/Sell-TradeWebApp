import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import {
  onSnapshot,
  doc,
  arrayUnion,
  updateDoc,
  Timestamp,
  serverTimestamp,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { v4 as uuid } from 'uuid';

export default function Messages() {
  const [text, setText] = useState('');
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  //   Sending message to the backend ->
  const sendHandler = async (data) => {
    if (text.length) {
      // Generating chat if there is no chat
      const combinedId =
        currentUser.uid > data.user.uid
          ? currentUser.uid + data.user.uid
          : data.user.uid + currentUser.uid;

      // try {
        const res = await getDoc(doc(db, 'chats', combinedId));
        if (!res.exists()) {
          //create a chat in chats collection
          await setDoc(doc(db, 'chats', combinedId), { messages: [] });

          //create user chats
          await updateDoc(doc(db, 'chatUsers', currentUser.uid), {
            [combinedId + '.userInfo']: {
              uid: data.user.uid,
              email: data.user.email,
            },
            [combinedId + '.date']: serverTimestamp(),
          });

          await updateDoc(doc(db, 'chatUsers', data.user.uid), {
            [combinedId + '.userInfo']: {
              uid: currentUser.uid,
              email: currentUser.email,
            },
            [combinedId + '.date']: serverTimestamp(),
          });
        }
      // // } catch (err) {
      // //   console.error(err);
      // // }
      // //

      await updateDoc(doc(db, 'chats', data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
      await updateDoc(doc(db, 'chatUsers', currentUser.uid), {
        [data.chatId + '.lastMessage']: {
          text,
        },
        [data.chatId + '.date']: serverTimestamp(),
      });

      await updateDoc(doc(db, 'chatUsers', data.user.uid), {
        [data.chatId + '.lastMessage']: {
          text,
        },
        [data.chatId + '.date']: serverTimestamp(),
      });

      setText('');
    }
  };

  return (
    <div className=' mx-3 h-5/6 overflow-hidden'>
      {data.user?.email && (
        <div className='h-5/6'>
          <p className='text-center text-white inset-x-1 mt-4 text-2xl'>
            to: {data.user?.email.split('@')[0].toUpperCase()}
          </p>
          <div className='h-96 relative overflow-y-scroll mt-2'>
            {' '}
            <MessagesData />
          </div>

          <div className=' bottom-0 grid grid-cols-4 mt-3 border-t'>
            <input
              placeholder='Type Message'
              className=' text-black p-1 rounded-lg col-span-3 m-3'
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
            <button
              className='bg-sky-500/75 border m-3 p-1 rounded-xl w-5/6'
              onClick={() => sendHandler(data)}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const MessagesData = ({sender}) => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  }, [messages]);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
      if (doc.exists()) {
       setMessages(doc.data().messages)
      } else {
        setMessages([])
      };
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  //   console.log(messages);

  return (
    <div className='h-full my-5 '>
      {messages.length ?
        messages?.map((m) => (
          <div
            ref={ref}
            className={`flow-root${m.senderId === currentUser.uid && ''}`}
            key={m.id}
          >
            <div
              className={` border w-fit p-2 m-2 rounded-full ${
                m.senderId === currentUser.uid && 'bg-teal-600 float-right'
              }`}
            >
              {m.text}
            </div>{' '}
          </div>
        )) : ''}
    </div>
  );
};
