import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login.jsx';
import ErrorElement from './pages/ErrorElement.jsx';
import Item from './pages/Item.jsx';
import Header from './components/Header.jsx';
import AddingItemTotList from './pages/AddingItemTotList.jsx';
import HowItWorks from './pages/HowItWorks.jsx';
import CategoryDynamic from './pages/CategoryDynamic.jsx';
import Profile from './pages/Profile.jsx';
import Chat from './pages/Chat.jsx';
import { AuthContext, AuthContextProvider } from './context/AuthContext.jsx';
import { ChatContextProvider } from './context/ChatContext.jsx';
import { NightModeContextProvider } from './context/NightModeContext.jsx';
// import { NightModeContext } from '../context/NightModeContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorElement />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/listed-item/:itemId',
    element: <Item />,
  },
  {
    path: '/list-item',
    element: <AddingItemTotList />,
  },
  {
    path: '/how-it-works',
    element: <HowItWorks />,
  },
  {
    path: '/categories/:cat',
    element: <CategoryDynamic />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/chat',
    element: <Chat />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <ChatContextProvider>
      <NightModeContextProvider>
        <React.StrictMode>
          <div>
            <RouterProvider router={router} />
          </div>
        </React.StrictMode>
      </NightModeContextProvider>
    </ChatContextProvider>
  </AuthContextProvider>
);
