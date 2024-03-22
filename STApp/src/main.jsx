import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login.jsx';
import ErrorElement from './pages/ErrorElement.jsx';
import Item from './pages/Item.jsx';
import Header from './components/Header.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorElement />
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/listed-item/:itemId',
    element: <Item />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
         <RouterProvider router={router} />
  </React.StrictMode>
);
