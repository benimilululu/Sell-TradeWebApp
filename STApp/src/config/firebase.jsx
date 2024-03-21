import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyA-NNn4Ki8EffhZiq-ChWgetfIfv8oevQs',
  authDomain: 'topfind-96b05.firebaseapp.com',
  projectId: 'topfind-96b05',
  storageBucket: 'topfind-96b05.appspot.com',
  messagingSenderId: '315321405082',
  appId: '1:315321405082:web:5ee53d20acf30f54019923',
  measurementId: 'G-9HJSM1J56P',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

export const db = getFirestore(app);
export const imgDB = getStorage(app);
