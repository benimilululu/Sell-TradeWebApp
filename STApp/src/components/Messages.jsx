import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { onSnapshot, doc, arrayUnion, updateDoc, Timestamp, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { v4 as uuid } from 'uuid';

export default function Messages() {
  const [text, setText] = useState('');
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  const sendHandler = async () => {
    await updateDoc(doc(db, 'chats', data.chatId), {
        messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now()
        })
    })

    await updateDoc(doc(db, 'chatUsers', currentUser.uid), {
        [data.chatId + '.lastMessage']: {
            text
        },
        [data.chatId+'.date']: serverTimestamp()
    })

    await updateDoc(doc(db, 'chatUsers', data.user.uid), {
      [data.chatId + '.lastMessage']: {
        text,
      },
      [data.chatId + '.date']: serverTimestamp(),
    });

    setText('')
  };

  return (
    <div className='mt-20'>
      {data.user?.email && (
        <div>
          <span>{data.user?.email}</span>
          <MessagesData />
          <div className='m-2'>
            <input
              className='text-black p-1 rounded-lg'
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
            <button className='border m-3 p-1' onClick={sendHandler}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const MessagesData = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  const ref = useRef()

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth'})
  }, [messages])

  useEffect(() => {
    const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  console.log(messages);

  return (
    <div ref={ref}>
      {messages && messages?.map(m => <div key={m.id}>{m.text}</div>)}
    </div>
  );
};
