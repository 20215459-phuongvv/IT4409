import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import classNames from 'classnames/bind';
import styles from './Checkout.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import DeliveryAddressForm from './DeliveryAddressForm';
import OrderSummary from './OrderSummary';

const cx = classNames.bind(styles);

const steps = ['Đăng nhập', 'Địa chỉ giao hàng', 'Tóm tắt đơn hàng', 'Thanh toán'];

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const location = useLocation();
  const querySearch = new URLSearchParams(location.search);
  const step = querySearch.get('step');
  const navigate = useNavigate();

  const handleNext = () => {
    let newSkipped = skipped;
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    navigate(`/checkout?step=${parseInt(step) + 1}`);
    
  };

  const handleBack = () => {
    navigate(`/checkout?step=${step - 1}`);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handlePayment = () => {
    console.log('handle payment');
  };

  return (
    <div className={cx('wrapper')}>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={step}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step  key={label} {...stepProps}>
                <StepLabel  {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        
          <React.Fragment>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext}>
              </Button>
            </Box>
            <div>
              
              {step == 2 ? <DeliveryAddressForm handleNext={handleNext} /> : <OrderSummary />}
            </div>
          </React.Fragment>
        
      </Box>
    </div>
  );
}
