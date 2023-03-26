import React from 'react';
import { Result, Button } from 'antd';
import { useLocation, Link } from 'react-router-dom';
const PaymentFeedback = () => {
  const location = useLocation();
  console.log(location.pathname);
  const route = location.pathname;

  return (
    <Result
      status={`${route == '/payment-success' ? 'success' : 'error'}`}
      title={`${route == '/payment-success' ? 'Payment success' : 'Payment failed'}`}
      subTitle={`${
        route == '/payment-success'
          ? 'Your payment has been processed successfully.'
          : 'Your payment could not be processed at this time. Please try again later.'
      }`}
      extra={
        <Link to="/">
          <Button>Back Home</Button>
        </Link>
      }
    />
  );
};

export default PaymentFeedback;
