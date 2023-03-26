import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';
import { StyledRow, StyledSpace, StyledCol, StyledCard } from '../components/StyledComponents';
const { Title } = Typography;
import { useNavigate } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { getPackages } from '../redux/thunks/packagesThunks';
import Spinner from '../components/Spinner';
import { loadStripe } from '@stripe/stripe-js';
import axios from '../axios';
// const packages = [
//   { name: 'Basic', storage: 5, price: 10 },
//   { name: 'Standard', storage: 10, price: 20 },
//   { name: 'Premium', storage: 20, price: 30 }
// ];

function SubscriptionPlans() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const packages = useSelector((state) => state.packages.packages);
  const loading = useSelector((state) => state.packages.loading);
  const [stripeLoading, setStripeLoading] = useState(false);
  const makePayment = async (p) => {
    setStripeLoading(true);

    const stripe = await loadStripe('pk_test_DqcESUADUHQqrjXSADS4LT0H00H6ysbP7l');

    const response = await axios.post('/packages/create-checkout-session', { package: p });

    setStripeLoading(false);

    const result = stripe.redirectToCheckout({
      sessionId: response.data.id
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  useEffect(() => {
    if (packages && !Object.keys(packages).length) dispatch(getPackages());
  }, []);
  return (
    <StyledSpace width="100%" padingTop="10%" direction="vertical" size={[0, 12]}>
      {(loading || stripeLoading) && <Spinner />}

      <StyledRow paddingLeft="7%">
        <StyledCol span={1}>
          <LeftOutlined onClick={() => navigate(-1)} />
        </StyledCol>
      </StyledRow>
      <StyledRow align="middle">
        <StyledCol span={8} offset={8}>
          <Title style={{ textAlign: 'center' }} level={2}>
            {`Buy Storage`}
          </Title>
        </StyledCol>
      </StyledRow>
      <StyledRow justify="center" gutter={[16, 16]}>
        {packages &&
          Object.keys(packages).length > 0 &&
          packages.map((p) => (
            <StyledCol xs={24} sm={12} md={8} lg={6} key={p.name}>
              <StyledCard onClick={() => makePayment(p)} title={p.name}>
                <p>Storage: {p.storage} MB</p>
                <p>Price: ${p.price} </p>
              </StyledCard>
            </StyledCol>
          ))}
      </StyledRow>
    </StyledSpace>
  );
}

export default SubscriptionPlans;
