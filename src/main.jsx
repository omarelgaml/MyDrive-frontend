import React from 'react';
import ReactDOM from 'react-dom/client';
import Landing from './pages/Landing';
import Login from './pages/Login';
import 'semantic-ui-css/semantic.min.css';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
import SubscriptionPlans from './pages/Subscribtion';
import PaymentFeedback from './pages/PaymentFeedback';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
    errorElement: (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link to="/">
            <Button>Back Home</Button>
          </Link>
        }
      />
    )
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/subscribe',
    element: <SubscriptionPlans />
  },
  {
    path: '/payment-success',
    element: <PaymentFeedback />
  },
  {
    path: '/payment-failure',
    element: <PaymentFeedback />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
