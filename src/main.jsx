import React from 'react';
import ReactDOM from 'react-dom/client';
import Landing from './pages/Landing';
import Login from './pages/Login';
import 'semantic-ui-css/semantic.min.css';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />
    //  errorElement: <div>oops</div>
  },
  {
    path: '/login',
    element: <Login />
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
